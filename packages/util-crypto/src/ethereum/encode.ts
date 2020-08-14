// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aToHex, u8aToU8a } from '@polkadot/util';

import { keccakAsU8a } from '../keccak';
import isEthereumAddress from './isAddress';

export default function ethereumEncode (_address?: string | Uint8Array): string {
  if (!_address) {
    return '0x';
  }

  const address = u8aToHex(u8aToU8a(_address), -1, false);

  if (!isEthereumAddress(`0x${address}`)) {
    return '0x';
  }

  const hash = u8aToHex(keccakAsU8a(address), -1, false);
  let result = '';

  for (let index = 0; index < 40; index++) {
    result = `${result}${parseInt(hash[index], 16) > 7 ? address[index].toUpperCase() : address[index]}`;
  }

  return `0x${result}`;
}
