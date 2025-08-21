// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hasBigInt } from '@polkadot/util';
import { bip39ToSeed, isReady } from '@polkadot/wasm-crypto';

import { mnemonicToSeedSync } from './bip39.js';
import { mnemonicValidate } from './validate.js';

/**
 * @name mnemonicToLegacySeed
 * @summary Creates a valid Ethereum/Bitcoin-compatible seed from a mnemonic input
 * @example
 * <BR>
 *
 * ```javascript
 * import { mnemonicGenerate, mnemonicToLegacySeed, mnemonicValidate } from '@polkadot/util-crypto';
 *
 * const mnemonic = mnemonicGenerate(); // => string
 * const isValidMnemonic = mnemonicValidate(mnemonic); // => boolean
 *
 * if (isValidMnemonic) {
 *   console.log(`Seed generated from mnemonic: ${mnemonicToLegacySeed(mnemonic)}`); => u8a
 * }
 * ```
 *
 * @param mnemonic - The BIP-39 mnemonic phrase to derive the secret from.
 * @param password - Optional: password to secure the seed (default: empty string).
 * @param onlyJs - Optional: If `true`, forces use of the JavaScript implementation instead of WASM.
 * @param byteLength - Optional: Either 32 or 64. Default is 32
 * @param rounds - Optional: Number of PBKDF2 iterations to run (default: 210000).
*/
export function mnemonicToLegacySeed (mnemonic: string, password = '', onlyJs?: boolean, byteLength: 32 | 64 = 32, rounds?: number): Uint8Array {
  if (!mnemonicValidate(mnemonic)) {
    throw new Error('Invalid bip39 mnemonic specified');
  } else if (![32, 64].includes(byteLength)) {
    throw new Error(`Invalid seed length ${byteLength}, expected 32 or 64`);
  }

  return byteLength === 32
    ? !hasBigInt || (!onlyJs && isReady())
      ? bip39ToSeed(mnemonic, password)
      : mnemonicToSeedSync(mnemonic, password, rounds).subarray(0, 32)
    : mnemonicToSeedSync(mnemonic, password, rounds);
}
