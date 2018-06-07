// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pair } from '@polkadot/util-triehash/types';

type Trie$PairNull = {
  k: Uint8Array,
  v: null
};

export type Temp$Storage = {
  [Uint8Array]: Trie$Pair | Trie$PairNull
};
