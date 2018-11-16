// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

// import { keccakAsU8a as hashing } from '@polkadot/util-crypto/index';
import { blake2AsU8a as hashing } from '@polkadot/util-crypto/index';
import trieRoot from '@polkadot/trie-hash/root';

const EMPTY_NODE = new Uint8Array();
const EMPTY_U8A = trieRoot([]);
const EMPTY_U8A_STR = trieRoot([]);
const EMPTY_HASH = hashing(EMPTY_U8A);
const EMPTY_HASH_STR = EMPTY_HASH.toString();

export {
  EMPTY_NODE,
  EMPTY_HASH,
  EMPTY_HASH_STR,
  EMPTY_U8A,
  EMPTY_U8A_STR
};
