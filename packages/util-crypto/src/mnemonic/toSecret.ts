// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { mnemonicToSeed } from 'bip39';
import bufferToU8a from '@polkadot/util/buffer/toU8a';

/**
 * @name toSecret
 * @signature toSecret (mnemonic: string): Uint8Array
 * @summary Creates a valid seed from a mnemonic input
 * @example
 * <BR>
 *
 * ```javascript
 * import { mnemonicGenerate, mnemonicValidate, toSecret } from '@polkadot/util-crypto';
 *
 * const mnemonic = mnemonicGenerate(); // => string
 * const isValidMnemonic = mnemonicValidate(mnemonic); // => boolean
 *
 * if (isValidMnemonic) {
 *   console.log(`Seed generated from mnemonic: ${toSecret(mnemonic)}`); => u8a
 * }
 * ```
 */
export default function toSecret (mnemonic: string): Uint8Array {
  return bufferToU8a(
    mnemonicToSeed(mnemonic)
  );
}
