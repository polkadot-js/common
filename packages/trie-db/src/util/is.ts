// Copyright 2017-2020 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Node, NodeBranch, NodeKv, NodeEmpty, NodeType } from '../types';

import { isNull } from '@polkadot/util';

import { getNodeType } from './node';

/**
 * @name isEmptyNode
 * @summary Returns true if node is NULL
 * @description Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)
 */
export function isEmptyNode (node: Node): node is NodeEmpty {
  return isNull(node);
}

/**
 * @name isKvNode
 * @summary Returns true if node is not empty and contains a single key/value pair
 * @description Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)
 */
export function isKvNode (node: Node): node is NodeKv {
  return !isEmptyNode(node) && node.length === 2;
}

/**
 * @name isExtensionNode
 * @summary Returns true if node is an Extension 2-item node
 * @description Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)
 */
export function isExtensionNode (node: Node): node is NodeKv {
  return getNodeType(node) === NodeType.EXTENSION;
}

/**
 * @name isLeafNode
 * @summary Returns true if node is an Leaf 2-item node
 * @description Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)
 */
export function isLeafNode (node: Node): node is NodeKv {
  return getNodeType(node) === NodeType.LEAF;
}

/**
 * @name isBranchNode
 * @summary Returns true if node is an Branch 17-item node
 * @description Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)
 */
export function isBranchNode (node: Node): node is NodeBranch {
  return !isEmptyNode(node) && node.length === 17;
}
