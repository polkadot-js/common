// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '../polyfill';

import { pbkdf2Sync } from 'pbkdf2';
import { bufferToU8a, stringToU8a, u8aToBuffer } from '@polkadot/util';
import { bip39ToMiniSecret, isReady } from '@polkadot/wasm-crypto';

import toEntropy from './toEntropy';

export default function toMiniSecret (mnemonic: string, password = '', onlyJs = false): Uint8Array {
  if (isReady() && !onlyJs) {
    return bip39ToMiniSecret(mnemonic, password);
  }

  const entropy = u8aToBuffer(toEntropy(mnemonic));
  const salt = u8aToBuffer(stringToU8a(`mnemonic${password}`));

  // return the first 32 bytes as the seed
  return bufferToU8a(
    pbkdf2Sync(entropy, salt, 2048, 64, 'sha512')
  ).slice(0, 32);
}
