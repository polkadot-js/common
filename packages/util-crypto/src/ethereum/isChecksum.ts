// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToHex } from '@polkadot/util';

import { keccakAsU8a } from '../keccak';

export default function isEthereumChecksum (_address: string): boolean {
  const address = _address.replace('0x', '');
  const hash = u8aToHex(keccakAsU8a(address.toLowerCase()), -1, false);

  for (let index = 0; index < 40; index++) {
    const char = address[index];
    const hashval = parseInt(hash[index], 16);

    if ((hashval > 7 && char !== char.toUpperCase()) || (hashval <= 7 && char !== char.toLowerCase())) {
      return false;
    }
  }

  return true;
}
