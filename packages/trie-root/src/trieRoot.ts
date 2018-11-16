// Copyright 2017-2018 @polkadot/trie-root authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { TriePair } from './types';

import { blake2AsU8a as hashing } from '@polkadot/util-crypto/index';

import unhashedTrie from './unhashedTrie';

export default function trieRoot (input: Array<TriePair>): Uint8Array {
  return hashing(unhashedTrie(input));
}
