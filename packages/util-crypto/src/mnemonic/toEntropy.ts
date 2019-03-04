// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { mnemonicToEntropy } from 'bip39';
import { hexAddPrefix, hexToU8a } from '@polkadot/util/index';

export default function toEntropy (mnemonic: string): Uint8Array {
  return hexToU8a(
    hexAddPrefix(
      mnemonicToEntropy(mnemonic)
    )
  );
}
