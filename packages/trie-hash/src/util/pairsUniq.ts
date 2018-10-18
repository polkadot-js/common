// Copyright 2017-2018 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Trie$Pair, Trie$Pairs } from '../types';

import { u8aToHex } from '@polkadot/util/index';

type PairMap = {
  [index: string]: Trie$Pair
};

export default function pairsUniq (pairs: Trie$Pairs): Trie$Pairs {
  const map = pairs.reduce((result, pair) => {
    result[u8aToHex(pair.k)] = pair;

    return result;
  }, ({} as PairMap));

  return Object
    .keys(map)
    .sort()
    .map((key) => map[key]);
}
