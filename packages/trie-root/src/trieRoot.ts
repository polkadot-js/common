// Copyright 2017-2018 @polkadot/trie-root authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Codec } from '@polkadot/trie-codec/types';
import { TriePair } from './types';

import { DEFAULT_CODEC } from './defaults';
import unhashedTrie from './unhashedTrie';

export default function trieRoot (input: Array<TriePair>, codec: Codec = DEFAULT_CODEC): Uint8Array {
  return codec.hashing(
    unhashedTrie(input, codec)
  );
}
