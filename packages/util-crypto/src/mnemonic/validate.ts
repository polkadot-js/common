// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { validateMnemonic } from 'bip39';

export default function mnemonicValidate (mnemonic: string): boolean {
  return validateMnemonic(mnemonic);
}
