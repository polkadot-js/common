// Copyright 2017-2018 @polkadot/util-triedb authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from '@polkadot/util-triehash/types';
import type { TrieDb } from '../types';
import type { Temp$Storage } from './types';

const trieRoot = require('@polkadot/util-triehash/root');

const commit = require('./commit');
const del = require('./del');
const get = require('./get');
const pairs = require('./pairs');
const set = require('./set');

module.exports = function temp (): TrieDb {
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
};
