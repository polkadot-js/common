// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import trieRoot from '@polkadot/trie-hash/root';

const EMPTY_ROOT_U8A = trieRoot([]);
const EMPTY_ROOT_STR = EMPTY_ROOT_U8A.toString();

export {
  EMPTY_ROOT_U8A,
  EMPTY_ROOT_STR
};
