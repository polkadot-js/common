// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { generateMnemonic } from 'bip39';

export default function mnemonicGenerate (): string {
  return generateMnemonic();
}
