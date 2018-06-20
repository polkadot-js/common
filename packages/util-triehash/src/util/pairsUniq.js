// Copyright 2017-2018 @polkadot/util-triehash authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pair, Trie$Pairs } from '../types';

import u8aToHex from '@polkadot/util/u8a/toHex';

type PairMap = {
  [string]: Trie$Pair
};

export default function pairsUniq (pairs: Trie$Pairs): Trie$Pairs {
  const map: PairMap = pairs.reduce((result, pair) => {
    result[u8aToHex(pair.k)] = pair;

    return result;
  }, {});

  return Object
    .keys(map)
    .sort()
    .map((key) => map[key]);
}
