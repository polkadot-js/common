// Copyright 2017-2018 @polkadot/util-triedb authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Trie$Pair } from '@polkadot/trie-hash/types';

export type Temp$Storage = {
  [index: string]: Trie$Pair
};
