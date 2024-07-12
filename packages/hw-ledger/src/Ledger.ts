// Copyright 2017-2024 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { SubstrateApp } from '@zondax/ledger-substrate';
import type { TransportDef, TransportType } from '@polkadot/hw-ledger-transports/types';
import type { AccountOptions, LedgerAddress, LedgerSignature, LedgerVersion } from './types.js';

import { newSubstrateApp } from '@zondax/ledger-substrate';

import { transports } from '@polkadot/hw-ledger-transports';
import { hexAddPrefix, u8aToBuffer, u8aWrapBytes } from '@polkadot/util';

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

/** @internal Wraps a sign/signRaw call and returns the associated signature */
function sign (method: 'sign' | 'signRaw', message: Uint8Array, accountOffset = 0, addressOffset = 0, { account = LEDGER_DEFAULT_ACCOUNT, addressIndex = LEDGER_DEFAULT_INDEX, change = LEDGER_DEFAULT_CHANGE }: Partial<AccountOptions> = {}): (app: SubstrateApp) => Promise<LedgerSignature> {
  return async (app: SubstrateApp): Promise<LedgerSignature> => {
    const { signature } = await wrapError(app[method](account + accountOffset, change, addressIndex + addressOffset, u8aToBuffer(message)));

    return {
      signature: hexAddPrefix(signature.toString('hex'))
    };
  };
}

/**
 * @name Ledger
 *
 * @description
 * Legacy wrapper for a ledger app -
 *   - it connects automatically on use, creating an underlying interface as required
 *   - Promises reject with errors (unwrapped errors from @zondax/ledger-substrate)
 * @deprecated Use LedgerGeneric for up to date integration with ledger
 */
export class Ledger {
  readonly #ledgerName: string;
  readonly #transportDef: TransportDef;

  #app: SubstrateApp | null = null;

  constructor (transport: TransportType, chain: Chain) {
    const ledgerName = ledgerApps[chain];
    const transportDef = transports.find(({ type }) => type === transport);

    if (!ledgerName) {
      throw new Error(`Unsupported Ledger chain ${chain}`);
    } else if (!transportDef) {
      throw new Error(`Unsupported Ledger transport ${transport}`);
    }

    this.#ledgerName = ledgerName;
    this.#transportDef = transportDef;
  }

  /**
   * Returns the address associated with a specific account & address offset. Optionally
   * asks for on-device confirmation
   */
  public async getAddress (confirm = false, accountOffset = 0, addressOffset = 0, { account = LEDGER_DEFAULT_ACCOUNT, addressIndex = LEDGER_DEFAULT_INDEX, change = LEDGER_DEFAULT_CHANGE }: Partial<AccountOptions> = {}): Promise<LedgerAddress> {
    return this.withApp(async (app: SubstrateApp): Promise<LedgerAddress> => {
      const { address, pubKey } = await wrapError(app.getAddress(account + accountOffset, change, addressIndex + addressOffset, confirm));

      return {
        address,
        publicKey: hexAddPrefix(pubKey)
      };
    });
  }

  /**
   * Returns the version of the Ledger application on the device
   */
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

  /**
   * Signs a transaction on the Ledger device
   */
  public async sign (message: Uint8Array, accountOffset?: number, addressOffset?: number, options?: Partial<AccountOptions>): Promise<LedgerSignature> {
    return this.withApp(sign('sign', message, accountOffset, addressOffset, options));
  }

  /**
   * Signs a message (non-transactional) on the Ledger device
   */
  public async signRaw (message: Uint8Array, accountOffset?: number, addressOffset?: number, options?: Partial<AccountOptions>): Promise<LedgerSignature> {
    return this.withApp(sign('signRaw', u8aWrapBytes(message), accountOffset, addressOffset, options));
  }

  /**
   * @internal
   *
   * Returns a created SubstrateApp to perform operations against. Generally
   * this is only used internally, to ensure consistent bahavior.
   */
  async withApp <T> (fn: (app: SubstrateApp) => Promise<T>): Promise<T> {
    try {
      if (!this.#app) {
        const transport = await this.#transportDef.create();

        // We need this override for the actual type passing - the Deno environment
        // is quite a bit stricter and it yields invalids between the two (specifically
        // since we mangle the imports from .default in the types for CJS/ESM and between
        // esm.sh versions this yields problematic outputs)
        //
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
        this.#app = newSubstrateApp(transport as any, this.#ledgerName);
      }

      return await fn(this.#app);
    } catch (error) {
      this.#app = null;

      throw error;
    }
  }
}
