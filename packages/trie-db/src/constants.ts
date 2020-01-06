// Copyright 2017-2020 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Codec } from '@polkadot/trie-codec/types';

import { trieRoot } from '@polkadot/trie-hash';

export interface Constants {
  EMPTY_NODE: Uint8Array;
  EMPTY_HASH: Uint8Array;
  EMPTY_HASH_STR: string;
  EMPTY_U8A: Uint8Array;
}

export default function (codec: Codec): Constants {
  const EMPTY_NODE = new Uint8Array();
  const EMPTY_U8A = trieRoot([], codec);
  const EMPTY_HASH = codec.hashing(EMPTY_U8A);
  const EMPTY_HASH_STR = EMPTY_HASH.toString();

  return {
    EMPTY_NODE,
    EMPTY_HASH,
    EMPTY_HASH_STR,
    EMPTY_U8A
  };
}
