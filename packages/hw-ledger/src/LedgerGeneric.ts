// Copyright 2017-2024 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TransportDef, TransportType } from '@polkadot/hw-ledger-transports/types';
import type { AccountOptionsGeneric, LedgerAddress, LedgerSignature, LedgerVersion } from './types.js';

import { PolkadotGenericApp } from '@zondax/ledger-substrate';

import { transports } from '@polkadot/hw-ledger-transports';
import { hexAddPrefix, u8aToBuffer, u8aWrapBytes } from '@polkadot/util';

import { ledgerApps } from './defaults.js';

export { packageInfo } from './packageInfo.js';

type Chain = keyof typeof ledgerApps;

type WrappedResult = Awaited<ReturnType<PolkadotGenericApp['getAddress' | 'getVersion' | 'sign' | 'signWithMetadata']>>;

// FIXME This type is a copy of the `class ResponseError`
// imported from `@zondax/ledger-js`. Happens because ledger-js includes
// circular dependencies. This is a hack to avoid versioning issues
// with Deno.
interface ResponseError {
  errorMessage: string
  returnCode: number
}

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
      throw new Error(`${(e as ResponseError).returnCode}: ${(e as ResponseError).errorMessage}`);
    }

    throw new Error((e as Error).message);
  }

  return result;
}

/** @internal Wraps a sign/signRaw call and returns the associated signature */
function sign (method: 'sign' | 'signRaw', message: Uint8Array, slip44: number, accountIndex = 0, addressOffset = 0): (app: PolkadotGenericApp) => Promise<LedgerSignature> {
  const bip42Path = `m/44'/${slip44}'/${accountIndex}'/${0}'/${addressOffset}'`;

  return async (app: PolkadotGenericApp): Promise<LedgerSignature> => {
    const { signature } = await wrapError(app[method](bip42Path, u8aToBuffer(message)));

    return {
      signature: hexAddPrefix(signature.toString('hex'))
    };
  };
}

/** @internal Wraps a signWithMetadata call and returns the associated signature */
function signWithMetadata (message: Uint8Array, slip44: number, accountIndex = 0, addressOffset = 0, { metadata }: Partial<AccountOptionsGeneric> = {}): (app: PolkadotGenericApp) => Promise<LedgerSignature> {
  const bip42Path = `m/44'/${slip44}'/${accountIndex}'/${0}'/${addressOffset}'`;

  return async (app: PolkadotGenericApp): Promise<LedgerSignature> => {
    if (!metadata) {
      throw new Error('The metadata option must be present when using signWithMetadata');
    }

    const bufferMsg = Buffer.from(message);

    const { signature } = await wrapError(app.signWithMetadata(bip42Path, bufferMsg, metadata));

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
 *   - Promises reject with errors (unwrapped errors from @zondax/ledger-substrate-js)
 */
export class LedgerGeneric {
  readonly #transportDef: TransportDef;
  readonly #slip44: number;
  /**
   * The chainId is represented by the chains token in all lowercase. Example: Polkadot -> dot
   */
  readonly #chainId?: string;
  /**
   * The metaUrl is seen as a server url that the underlying `PolkadotGenericApp` will use to
   * retrieve the signature given a tx blob, and a chainId. It is important to note that if you would like to avoid
   * having any network calls made, use `signWithMetadata`, and avoid `sign`.
   */
  readonly #metaUrl?: string;

  #app: PolkadotGenericApp | null = null;

  constructor (transport: TransportType, chain: Chain, slip44: number, chainId?: string, metaUrl?: string) {
    const ledgerName = ledgerApps[chain];
    const transportDef = transports.find(({ type }) => type === transport);

    if (!ledgerName) {
      throw new Error(`Unsupported Ledger chain ${chain}`);
    } else if (!transportDef) {
      throw new Error(`Unsupported Ledger transport ${transport}`);
    }

    this.#metaUrl = metaUrl;
    this.#chainId = chainId;
    this.#slip44 = slip44;
    this.#transportDef = transportDef;
  }

  /**
   * @description Returns the address associated with a specific account & address offset. Optionally
   * asks for on-device confirmation
   */
  public async getAddress (ss58Prefix: number, confirm = false, accountIndex = 0, addressOffset = 0): Promise<LedgerAddress> {
    const bip42Path = `m/44'/${this.#slip44}'/${accountIndex}'/${0}'/${addressOffset}'`;

    return this.withApp(async (app: PolkadotGenericApp): Promise<LedgerAddress> => {
      const { address, pubKey } = await wrapError(app.getAddress(bip42Path, ss58Prefix, confirm));

      return {
        address,
        publicKey: hexAddPrefix(pubKey)
      };
    });
  }

  /**
   * @description Returns the version of the Ledger application on the device
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
   * @description Signs a transaction on the Ledger device. This requires the LedgerGeneric class to be instantiated with `chainId`, and `metaUrl`
   */
  public async sign (message: Uint8Array, accountIndex?: number, addressOffset?: number): Promise<LedgerSignature> {
    return this.withApp(sign('sign', message, this.#slip44, accountIndex, addressOffset));
  }

  /**
   * @description Signs a message (non-transactional) on the Ledger device
   */
  public async signRaw (message: Uint8Array, accountIndex?: number, addressOffset?: number): Promise<LedgerSignature> {
    return this.withApp(sign('signRaw', u8aWrapBytes(message), this.#slip44, accountIndex, addressOffset));
  }

  /**
   * @description Signs a transaction on the ledger device provided some metadata.
   */
  public async signWithMetadata (message: Uint8Array, accountIndex?: number, addressOffset?: number, options?: Partial<AccountOptionsGeneric>): Promise<LedgerSignature> {
    return this.withApp(signWithMetadata(message, this.#slip44, accountIndex, addressOffset, options));
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
        this.#app = new PolkadotGenericApp(transport as any, this.#chainId, this.#metaUrl);
      }

      return await fn(this.#app);
    } catch (error) {
      this.#app = null;

      throw error;
    }
  }
}
