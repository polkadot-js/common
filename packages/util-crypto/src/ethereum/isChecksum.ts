// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

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
