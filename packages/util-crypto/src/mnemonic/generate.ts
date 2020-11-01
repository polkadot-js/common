// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '../polyfill';

import { bip39Generate, isReady } from '@polkadot/wasm-crypto';

import { generateMnemonic } from './bip39';

export type WordCount = 12 | 15 | 18 | 21 | 24;

// mapping of words to the actual strength (as expected)
const STRENGTH_MAP = {
  12: 16 * 8,
  15: 20 * 8,
  18: 24 * 8,
  21: 28 * 8,
  24: 32 * 8
};

/**
 * @name mnemonicGenerate
 * @summary Creates a valid mnemonic string using using [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).
 * @example
 * <BR>
 *
 * ```javascript
 * import { mnemonicGenerate } from '@polkadot/util-crypto';
 *
 * const mnemonic = mnemonicGenerate(); // => string
 * ```
 */
export default function mnemonicGenerate (numWords: WordCount = 12, onlyJs = false): string {
  return isReady() && !onlyJs
    ? bip39Generate(numWords)
    : generateMnemonic(STRENGTH_MAP[numWords]);
}
