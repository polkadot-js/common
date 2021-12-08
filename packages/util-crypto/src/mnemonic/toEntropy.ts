// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { bip39ToEntropy } from '@polkadot/wasm-crypto';

import { isWasm } from '../helpers';
import { mnemonicToEntropy as jsToEntropy } from './bip39';

export function mnemonicToEntropy (mnemonic: string, onlyJs?: boolean): Uint8Array {
  return isWasm(onlyJs)
    ? bip39ToEntropy(mnemonic)
    : jsToEntropy(mnemonic);
}
