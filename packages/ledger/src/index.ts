// Copyright 2017-2021 @polkadot/ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type Transport from '@ledgerhq/hw-transport';
import type { AccountOptions, LedgerAddress, LedgerSignature, LedgerTypes, LedgerVersion } from './types';

import { newDockApp, newKusamaApp, newPolkadotApp, newPolymeshApp, ResponseBase, SubstrateApp } from '@zondax/ledger-polkadot';

import { transports } from '@polkadot/ledger-transports';
import { assert, bufferToU8a, u8aToBuffer, u8aToHex } from '@polkadot/util';

export const LEDGER_DEFAULT_ACCOUNT = 0x80000000;

export const LEDGER_DEFAULT_CHANGE = 0x80000000;

export const LEDGER_DEFAULT_INDEX = 0x80000000;

const SUCCESS_CODE = 0x9000;

// These match up with the network keys in the @polkadot/networks package
// (which is turn aligns with the substrate/ss58-registry.json as the single
// source of truth)
const APPS: Record<string, (transport: Transport) => SubstrateApp> = {
  dock: newDockApp,
  kusama: newKusamaApp,
  polkadot: newPolkadotApp,
  polymath: newPolymeshApp
};

type Chain = keyof typeof APPS;

// A very basic wrapper for a ledger app -
//  - it connects automatically, creating an app as required
//  - Promises return errors (instead of wrapper errors)
export class Ledger {
  #app: SubstrateApp | null = null;

  #chain: Chain;

  #transport: LedgerTypes;

  constructor (transport: LedgerTypes, chain: Chain) {
    // u2f is deprecated
    assert(['hid', 'webusb'].includes(transport), `Unsupported transport ${transport}`);
    assert(Object.keys(APPS).includes(chain), `Unsupported chain ${chain}`);

    this.#chain = chain;
    this.#transport = transport;
  }

  public async getAddress (confirm = false, accountOffset = 0, addressOffset = 0, { account = LEDGER_DEFAULT_ACCOUNT, addressIndex = LEDGER_DEFAULT_INDEX, change = LEDGER_DEFAULT_CHANGE }: Partial<AccountOptions> = {}): Promise<LedgerAddress> {
    return this.#withApp(async (app: SubstrateApp): Promise<LedgerAddress> => {
      const { address, pubKey } = await this.#wrapError(app.getAddress(account + accountOffset, change, addressIndex + addressOffset, confirm));

      return {
        address,
        publicKey: `0x${pubKey}`
      };
    });
  }

  public async getVersion (): Promise<LedgerVersion> {
    return this.#withApp(async (app: SubstrateApp): Promise<LedgerVersion> => {
      const { device_locked: isLocked, major, minor, patch, test_mode: isTestMode } = await this.#wrapError(app.getVersion());

      return {
        isLocked,
        isTestMode,
        version: [major, minor, patch]
      };
    });
  }

  public async sign (message: Uint8Array, accountOffset = 0, addressOffset = 0, { account = LEDGER_DEFAULT_ACCOUNT, addressIndex = LEDGER_DEFAULT_INDEX, change = LEDGER_DEFAULT_CHANGE }: Partial<AccountOptions> = {}): Promise<LedgerSignature> {
    return this.#withApp(async (app: SubstrateApp): Promise<LedgerSignature> => {
      const buffer = u8aToBuffer(message);
      const { signature } = await this.#wrapError(app.sign(account + accountOffset, change, addressIndex + addressOffset, buffer));

      return {
        signature: u8aToHex(bufferToU8a(signature))
      };
    });
  }

  #getApp = async (): Promise<SubstrateApp> => {
    if (!this.#app) {
      const def = transports.find(({ type }) => type === this.#transport);

      assert(def, `Unable to find a transport for ${this.#transport}`);

      const transport = await def.create();

      this.#app = APPS[this.#chain](transport);
    }

    return this.#app;
  };

  #withApp = async <T> (fn: (app: SubstrateApp) => Promise<T>): Promise<T> => {
    try {
      const app = await this.#getApp();

      return await fn(app);
    } catch (error) {
      this.#app = null;

      throw error;
    }
  };

  #wrapError = async <T extends ResponseBase> (promise: Promise<T>): Promise<T> => {
    const result = await promise;

    assert(result.return_code === SUCCESS_CODE, result.error_message);

    return result;
  };
}
