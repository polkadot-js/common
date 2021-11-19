// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hasBigInt } from '@polkadot/util';
import { bip39ToEntropy, isReady } from '@polkadot/wasm-crypto';

import { mnemonicToEntropy as jsToEntropy } from './bip39';

export function mnemonicToEntropy (mnemonic: string, onlyJs = false): Uint8Array {
  return !hasBigInt || (isReady() && !onlyJs)
    ? bip39ToEntropy(mnemonic)
    : jsToEntropy(mnemonic);
}
