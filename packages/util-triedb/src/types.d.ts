// Copyright 2017-2018 @polkadot/util-triedb authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Logger } from '@polkadot/util/types';
import { Trie$Pairs } from '@polkadot/trie-hash/types';

export type TrieDb = {
  clear: () => void,
  commit: (values?: Trie$Pairs) => void,
  del: (key: Uint8Array) => void,
  isEmpty: () => boolean,
  get: (key: Uint8Array) => Uint8Array | null,
  pairs: () => Trie$Pairs,
  set: (key: Uint8Array, value: Uint8Array) => void,
  trieRoot: () => Uint8Array
}

export type TrieDbState = {
  db: {},
  l: Logger,
  storage: TrieDb
};
