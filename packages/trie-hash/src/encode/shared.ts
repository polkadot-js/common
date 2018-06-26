// Copyright 2017-2018 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Trie$Pairs } from '../types';

import encodeAux from './aux';
import encodeHexPrefix from './hexPrefix';

export default function encodeShared (pairs: Trie$Pairs, preLength: number, sharedLength: number): Array<any> {
  return [
    encodeHexPrefix(
      pairs[0].k.slice(preLength, sharedLength),
      false
    ),
    encodeAux(pairs, sharedLength)
  ];
}
