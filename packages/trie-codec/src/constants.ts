// Copyright 2017-2020 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export const BITMAP = [
  1 << 0,
  1 << 1,
  1 << 2,
  1 << 3,
  1 << 4,
  1 << 5,
  1 << 6,
  1 << 7,
  1 << 8,
  1 << 9,
  1 << 10,
  1 << 11,
  1 << 12,
  1 << 13,
  1 << 14,
  1 << 15
];

export const EMPTY_TRIE = 0;
export const LEAF_NODE_OFFSET = 1;
export const LEAF_NODE_BIG = 127;
export const EXTENSION_NODE_OFFSET = 128;
export const EXTENSION_NODE_BIG = 253;
export const BRANCH_NODE_NO_VALUE = 254;
export const BRANCH_NODE_WITH_VALUE = 255;
export const LEAF_NODE_THRESHOLD = LEAF_NODE_BIG - LEAF_NODE_OFFSET;
export const EXTENSION_NODE_THRESHOLD = EXTENSION_NODE_BIG - EXTENSION_NODE_OFFSET; // 125
export const LEAF_NODE_SMALL_MAX = LEAF_NODE_BIG - 1;
export const EXTENSION_NODE_SMALL_MAX = EXTENSION_NODE_BIG - 1;

export const NODE_TYPE_NULL = 0;
export const NODE_TYPE_BRANCH = 1;
export const NODE_TYPE_EXT = 2;
export const NODE_TYPE_LEAF = 3;
