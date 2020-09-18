// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '../polyfill';

import { mnemonicToEntropy } from 'bip39';
import { hexAddPrefix, hexToU8a } from '@polkadot/util';
import { bip39ToEntropy, isReady } from '@polkadot/wasm-crypto';

export default function toEntropy (mnemonic: string): Uint8Array {
  return isReady()
    ? bip39ToEntropy(mnemonic)
    : hexToU8a(
      hexAddPrefix(
        mnemonicToEntropy(mnemonic)
      )
    );
}
