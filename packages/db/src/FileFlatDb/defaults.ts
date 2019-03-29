// Copyright 2017-2019 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// Allows for 1,099,511,627,776 filesize (max allowed here is 6 as per Nodejs)
const UINT_SIZE = 5;
const DEFAULT_FILE = 'store.db';
const ONE_K = 1024;

// 16 for nibbles (key -> asNibbles), 256 for bytes (key -> asU8a)
// There is a tradeof here:
//   - with nibbles there are more writes and more read branching traversals
//   - with bytes there are less writes, however more disk space
const ENTRY_NUM: 16 | 256 = 16;
const ENTRY_SIZE = 1 + UINT_SIZE;

// the size of a branch entry, 96 for nibbles, 1,536 for bytes
const BRANCH_SIZE = ENTRY_NUM * ENTRY_SIZE;

// key calculations
const KEY_IS_NIBBLES = (ENTRY_NUM as any) === 16;
const KEY_SIZE = 32;
const KEY_PARTS_LENGTH = KEY_IS_NIBBLES
  ? KEY_SIZE * 2
  : KEY_SIZE;
const KEY_TOTAL_SIZE = KEY_SIZE + UINT_SIZE + UINT_SIZE;

// LRU caches so things don't need to be read directly from disk when fresh
const LRU_BRANCH_COUNT = KEY_IS_NIBBLES
  ? 32 * ONE_K
  : 4 * ONE_K;
const LRU_DATA_COUNT = 32 * ONE_K;

export default {
  BRANCH_SIZE,
  DEFAULT_FILE,
  ENTRY_NUM,
  ENTRY_SIZE,
  KEY_IS_NIBBLES,
  KEY_PARTS_LENGTH,
  KEY_SIZE,
  KEY_TOTAL_SIZE,
  LRU_BRANCH_COUNT,
  LRU_DATA_COUNT,
  UINT_SIZE
};
