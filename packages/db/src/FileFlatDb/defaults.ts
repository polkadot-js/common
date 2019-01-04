// Copyright 2017-2019 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// NOTE 1,099,511,627,776 filesize (max allowed here is 6 as per Nodejs)
const UINT_SIZE = 5;
const KEY_SIZE = 32;
const KEY_TOTAL_SIZE = KEY_SIZE + UINT_SIZE + UINT_SIZE;
const ENTRY_NUM = 16; // nibbles, 256 for bytes (where serialize would be noop)
const ENTRY_SIZE = 1 + UINT_SIZE;
const BRANCH_SIZE = ENTRY_NUM * ENTRY_SIZE;
const DEFAULT_FILE = 'store.db';
const LRU_BRANCH_COUNT = 16384; // * 96 = bytes
const LRU_DATA_COUNT = 8192;

export default {
  BRANCH_SIZE,
  DEFAULT_FILE,
  ENTRY_NUM,
  ENTRY_SIZE,
  KEY_SIZE,
  KEY_TOTAL_SIZE,
  LRU_BRANCH_COUNT,
  LRU_DATA_COUNT,
  UINT_SIZE
};
