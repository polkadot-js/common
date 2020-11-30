// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringToU8a, u8aToBuffer } from '@polkadot/util';
import { bip39ToMiniSecret, isReady } from '@polkadot/wasm-crypto';

import { pbkdf2Encode } from '../pbkdf2';
import { mnemonicToEntropy } from './toEntropy';

export function mnemonicToMiniSecret (mnemonic: string, password = '', onlyJs = false): Uint8Array {
  if (isReady() && !onlyJs) {
    return bip39ToMiniSecret(mnemonic, password);
  }

  const entropy = u8aToBuffer(mnemonicToEntropy(mnemonic));
  const salt = u8aToBuffer(stringToU8a(`mnemonic${password}`));

  // return the first 32 bytes as the seed
  return pbkdf2Encode(entropy, salt).password.slice(0, 32);
}
