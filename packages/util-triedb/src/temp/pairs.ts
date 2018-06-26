// Copyright 2017-2018 @polkadot/util-triedb authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Trie$Pairs } from '@polkadot/trie-hash/types';
import { Temp$Storage } from './types';

export default function pairs (storage: Temp$Storage): Trie$Pairs {
  return Object
    .keys(storage)
    .map((k) => storage[k]);
}
