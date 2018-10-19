// Copyright 2017-2018 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Trie$Pairs } from '../types';

import { keccakAsU8a } from '@polkadot/util-crypto/index';
import rlpEncode from '@polkadot/util-rlp/encode';

import encode from './index';

export default function encodeAux (pairs: Trie$Pairs, preLength: number): Uint8Array | any[] {
  const encoded = encode(pairs, preLength);
  const rlped = rlpEncode(encoded);

  if (rlped.length <= 31) {
    return encoded;
  }

  return keccakAsU8a(rlped);
}
