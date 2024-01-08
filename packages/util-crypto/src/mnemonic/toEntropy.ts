// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hasBigInt } from '@polkadot/util';
import { bip39ToEntropy, isReady } from '@polkadot/wasm-crypto';

import { mnemonicToEntropy as jsToEntropy } from './bip39.js';

export function mnemonicToEntropy (mnemonic: string, wordlist?: string[], onlyJs?: boolean): Uint8Array {
  return !hasBigInt || (!wordlist && !onlyJs && isReady())
    ? bip39ToEntropy(mnemonic)
    : jsToEntropy(mnemonic, wordlist);
}
