// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { mnemonicToSeed } from 'bip39';
import { bufferToU8a } from '@polkadot/util/index';

export default function toSecret (mnemonic: string): Uint8Array {
  return bufferToU8a(
    mnemonicToSeed(mnemonic)
  );
}
