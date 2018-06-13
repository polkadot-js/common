// Copyright 2017-2018 @polkadot/util-triedb authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pair } from '@polkadot/util-triehash/types';

export type Temp$Storage = {
  [Uint8Array]: Trie$Pair
};
