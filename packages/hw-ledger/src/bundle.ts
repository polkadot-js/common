// Copyright 2017-2024 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ResponseError } from '@zondax/ledger-js';
import type { TransportDef, TransportType } from '@polkadot/hw-ledger-transports/types';
import type { AccountOptions, LedgerAddress, LedgerSignature, LedgerVersion } from './types.js';

import { PolkadotGenericApp } from '@zondax/ledger-substrate';

import { transports } from '@polkadot/hw-ledger-transports';
import { hexAddPrefix, u8aToBuffer, u8aWrapBytes } from '@polkadot/util';

import { LEDGER_DEFAULT_INDEX } from './constants.js';
import { ledgerApps } from './defaults.js';

export { packageInfo } from './packageInfo.js';

type Chain = keyof typeof ledgerApps;

type WrappedResult = Awaited<ReturnType<PolkadotGenericApp['getAddress' | 'getVersion' | 'sign']>>;

/** @internal Wraps a PolkadotGenericApp call, checking the result for any errors which result in a rejection */
async function wrapError <T extends WrappedResult> (promise: Promise<T>): Promise<T> {
  let result: T;

  try {
    result = await promise;
  } catch (e: unknown) {
    // We check to see if the propogated error is the newer ResponseError type.
    // The response code use to be part of the result, but with the latest breaking changes from 0.42.x
    // the interface and it's types have completely changed.
    if ((e as ResponseError).returnCode) {
      throw new Error((e as ResponseError).errorMessage);
    }

    throw new Error((e as Error).message);
  }

  return result;
}

/** @internal Wraps a sign/signRaw call and returns the associated signature */
function sign (method: 'sign' | 'signRaw', message: Uint8Array, accountOffset = 0, addressOffset = 0, { addressIndex = LEDGER_DEFAULT_INDEX }: Partial<AccountOptions> = {}): (app: PolkadotGenericApp) => Promise<LedgerSignature> {
  const bip42Path = `m/44'/354'/${addressIndex}'/${accountOffset}'/${addressOffset}'`;

  return async (app: PolkadotGenericApp): Promise<LedgerSignature> => {
    const { signature } = await wrapError(app[method](bip42Path, u8aToBuffer(message)));

    return {
      signature: hexAddPrefix(signature.toString('hex'))
    };
  };
}

/**
 * @name Ledger
 *
 * @description
 * A very basic wrapper for a ledger app -
 *   - it connects automatically on use, creating an underlying interface as required
 *   - Promises reject with errors (unwrapped errors from @zondax/ledger-substrate)
 */
export class Ledger {
  readonly #ledgerName: string;
  readonly #transportDef: TransportDef;

  #app: PolkadotGenericApp | null = null;

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
  public async getAddress (confirm = false, accountOffset = 0, addressOffset = 0, ss58Prefix: number, { addressIndex = LEDGER_DEFAULT_INDEX }: Partial<AccountOptions> = {}): Promise<LedgerAddress> {
    const bip42Path = `m/44'/354'/${addressIndex}'/${accountOffset}'/${addressOffset}'`;

    return this.withApp(async (app: PolkadotGenericApp): Promise<LedgerAddress> => {
      const { address, pubKey } = await wrapError(app.getAddress(bip42Path, ss58Prefix, confirm));

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
    return this.withApp(async (app: PolkadotGenericApp): Promise<LedgerVersion> => {
      const { deviceLocked: isLocked, major, minor, patch, testMode: isTestMode } = await wrapError(app.getVersion());

      return {
        isLocked: !!isLocked,
        isTestMode: !!isTestMode,
        version: [major || 0, minor || 0, patch || 0]
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
   * Returns a created PolkadotGenericApp to perform operations against. Generally
   * this is only used internally, to ensure consistent bahavior.
   */
  async withApp <T> (fn: (app: PolkadotGenericApp) => Promise<T>): Promise<T> {
    try {
      if (!this.#app) {
        const transport = await this.#transportDef.create();

        // We need this override for the actual type passing - the Deno environment
        // is quite a bit stricter and it yields invalids between the two (specifically
        // since we mangle the imports from .default in the types for CJS/ESM and between
        // esm.sh versions this yields problematic outputs)
        //
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
        this.#app = new PolkadotGenericApp(transport as any, this.#ledgerName);
      }

      return await fn(this.#app);
    } catch (error) {
      this.#app = null;

      throw error;
    }
  }
}
