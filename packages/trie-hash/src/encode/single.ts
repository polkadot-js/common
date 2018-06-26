// Copyright 2017-2018 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Trie$Pair } from '../types';

import encodeHexPrefix from './hexPrefix';

export default function encodeSingle (pair: Trie$Pair, preLength: number): Array<any> {
  return [
    encodeHexPrefix(
      pair.k.slice(preLength),
      true
    ),
    pair.v
  ];
}
