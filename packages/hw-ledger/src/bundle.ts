// Copyright 2017-2023 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { SubstrateApp } from '@zondax/ledger-substrate';
import type { AccountOptions, LedgerAddress, LedgerSignature, LedgerTypes, LedgerVersion } from './types.js';

import { newSubstrateApp } from '@zondax/ledger-substrate';

import { transports } from '@polkadot/hw-ledger-transports';
import { hexAddPrefix, u8aToBuffer } from '@polkadot/util';

import { LEDGER_DEFAULT_ACCOUNT, LEDGER_DEFAULT_CHANGE, LEDGER_DEFAULT_INDEX, LEDGER_SUCCESS_CODE } from './constants.js';
import { ledgerApps } from './defaults.js';

export { packageInfo } from './packageInfo.js';

type Chain = keyof typeof ledgerApps;

type WrappedResult = Awaited<ReturnType<SubstrateApp['getAddress' | 'getVersion' | 'sign']>>;

/** @internal Wraps a SubstrateApp call, checking the result for any errors which result in a rejection */
async function wrapError <T extends WrappedResult> (promise: Promise<T>): Promise<T> {
  const result = await promise;

  if (result.return_code !== LEDGER_SUCCESS_CODE) {
    throw new Error(result.error_message);
  }

  return result;
}

// A very basic wrapper for a ledger app -
//  - it connects automatically, creating an app as required
//  - Promises return errors (instead of wrapper errors)
export class Ledger {
  #app: SubstrateApp | null = null;

  #chain: Chain;

  #transport: LedgerTypes;

  constructor (transport: LedgerTypes, chain: Chain) {
    // u2f is deprecated
    if (!['hid', 'webusb'].includes(transport)) {
      throw new Error(`Unsupported transport ${transport}`);
    } else if (!Object.keys(ledgerApps).includes(chain)) {
      throw new Error(`Unsupported chain ${chain}`);
    }

    this.#chain = chain;
    this.#transport = transport;
  }

  public async getAddress (confirm = false, accountOffset = 0, addressOffset = 0, { account = LEDGER_DEFAULT_ACCOUNT, addressIndex = LEDGER_DEFAULT_INDEX, change = LEDGER_DEFAULT_CHANGE }: Partial<AccountOptions> = {}): Promise<LedgerAddress> {
    return this.withApp(async (app: SubstrateApp): Promise<LedgerAddress> => {
      const { address, pubKey } = await wrapError(app.getAddress(account + accountOffset, change, addressIndex + addressOffset, confirm));

      return {
        address,
        publicKey: hexAddPrefix(pubKey)
      };
    });
  }

  public async getVersion (): Promise<LedgerVersion> {
    return this.withApp(async (app: SubstrateApp): Promise<LedgerVersion> => {
      const { device_locked: isLocked, major, minor, patch, test_mode: isTestMode } = await wrapError(app.getVersion());

      return {
        isLocked,
        isTestMode,
        version: [major, minor, patch]
      };
    });
  }

  public async sign (message: Uint8Array, accountOffset = 0, addressOffset = 0, { account = LEDGER_DEFAULT_ACCOUNT, addressIndex = LEDGER_DEFAULT_INDEX, change = LEDGER_DEFAULT_CHANGE }: Partial<AccountOptions> = {}): Promise<LedgerSignature> {
    return this.withApp(async (app: SubstrateApp): Promise<LedgerSignature> => {
      const buffer = u8aToBuffer(message);
      const { signature } = await wrapError(app.sign(account + accountOffset, change, addressIndex + addressOffset, buffer));

      return {
        signature: hexAddPrefix(signature.toString('hex'))
      };
    });
  }

  async getApp (): Promise<SubstrateApp> {
    if (!this.#app) {
      const def = transports.find(({ type }) => type === this.#transport);

      if (!def) {
        throw new Error(`Unable to find a transport for ${this.#transport}`);
      }

      const transport = await def.create();

      this.#app = newSubstrateApp(transport, ledgerApps[this.#chain]);
    }

    return this.#app;
  }

  async withApp <T> (fn: (app: SubstrateApp) => Promise<T>): Promise<T> {
    try {
      const app = await this.getApp();

      return await fn(app);
    } catch (error) {
      this.#app = null;

      throw error;
    }
  }
}
