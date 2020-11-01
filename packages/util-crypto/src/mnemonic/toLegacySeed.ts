// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { bufferToU8a } from '@polkadot/util';

import { bip39ToSeed, isReady } from '@polkadot/wasm-crypto';

import { mnemonicToSeedSync } from './bip39';

/**
 * @name toSeed
 * @summary Creates a valid Ethereum/Bitcoin-compatible seed from a mnemonic input
 * @example
 * <BR>
 *
 * ```javascript
 * import { mnemonicGenerate, mnemonicToBip39, mnemonicValidate } from '@polkadot/util-crypto';
 *
 * const mnemonic = mnemonicGenerate(); // => string
 * const isValidMnemonic = mnemonicValidate(mnemonic); // => boolean
 *
 * if (isValidMnemonic) {
 *   console.log(`Seed generated from mnemonic: ${mnemonicToBip39(mnemonic)}`); => u8a
 * }
 * ```
 */
export default function toLegacy (mnemonic: string, password = '', onlyJs = false): Uint8Array {
  return isReady() && !onlyJs
    ? bip39ToSeed(mnemonic, password)
    : bufferToU8a(mnemonicToSeedSync(mnemonic, password)).subarray(0, 32);
}
