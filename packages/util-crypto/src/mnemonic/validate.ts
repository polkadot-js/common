// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hasBigInt } from '@polkadot/util';
import { bip39Validate, isReady } from '@polkadot/wasm-crypto';

import { validateMnemonic } from './bip39.js';

/**
 * @name mnemonicValidate
 * @summary Validates a mnemonic input using [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).
 * @example
 * <BR>
 *
 * ```javascript
 * import { mnemonicGenerate, mnemonicValidate } from '@polkadot/util-crypto';
 *
 * const mnemonic = mnemonicGenerate(); // => string
 * const isValidMnemonic = mnemonicValidate(mnemonic); // => boolean
 * ```
 */
export function mnemonicValidate (mnemonic: string, wordlist?: string[], onlyJs?: boolean): boolean {
  return !hasBigInt || (!wordlist && !onlyJs && isReady())
    ? bip39Validate(mnemonic)
    : validateMnemonic(mnemonic, wordlist);
}
