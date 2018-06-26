// Copyright 2017-2018 @polkadot/util-triedb authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Trie$Pairs } from '@polkadot/trie-hash/types';
import { TrieDb } from '../types';
import { Temp$Storage } from './types';

import trieRoot from '@polkadot/trie-hash/root';

import commit from './commit';
import del from './del';
import get from './get';
import pairs from './pairs';
import set from './set';

export default function temp (): TrieDb {
  let storage: Temp$Storage = {};

  return {
    clear: (): void => {
      storage = {};
    },
    commit: (values: Trie$Pairs = []): void =>
      commit(storage, values),
    del: (k: Uint8Array): void =>
      del(storage, k),
    isEmpty: (): boolean =>
      Object.keys(storage).length === 0,
    get: (k: Uint8Array): Uint8Array | null =>
      get(storage, k),
    pairs: (): Trie$Pairs =>
      pairs(storage),
    set: (k: Uint8Array, v: Uint8Array): void =>
      set(storage, k, v),
    trieRoot: (): Uint8Array =>
      trieRoot(pairs(storage))
  };
}
