// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

export const EMPTY_TRIE = 0;
export const LEAF_NODE_OFFSET = 1;
export const LEAF_NODE_BIG = 127;
export const EXTENSION_NODE_OFFSET = 128;
export const EXTENSION_NODE_BIG = 253;
export const BRANCH_NODE_NO_VALUE = 254;
export const BRANCH_NODE_WITH_VALUE = 255;
export const LEAF_NODE_THRESHOLD = LEAF_NODE_BIG - LEAF_NODE_OFFSET;
export const EXTENSION_NODE_THRESHOLD = EXTENSION_NODE_BIG - EXTENSION_NODE_OFFSET;	// 125
export const LEAF_NODE_SMALL_MAX = LEAF_NODE_BIG - 1;
export const EXTENSION_NODE_SMALL_MAX = EXTENSION_NODE_BIG - 1;
