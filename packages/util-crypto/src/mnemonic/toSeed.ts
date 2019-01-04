// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import toSecret from './toSecret';

/**
 * @name toSeed
 * @signature toSeed (mnemonic: string): Uint8Array
 * @summary Creates a valid seed from a mnemonic input
 * @example
 * <BR>
 *
 * ```javascript
 * import { mnemonicGenerate, mnemonicToSeed, mnemonicValidate } from '@polkadot/util-crypto';
 *
 * const mnemonic = mnemonicGenerate(); // => string
 * const isValidMnemonic = mnemonicValidate(mnemonic); // => boolean
 *
 * if (isValidMnemonic) {
 *   console.log(`Seed generated from mnemonic: ${mnemonicToSeed(mnemonic)}`); => u8a
 * }
 * ```
 */
export default function toSeed (mnemonic: string): Uint8Array {
  return toSecret(mnemonic).subarray(0, 32);
}
