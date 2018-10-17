// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Node, NodeBranch, NodeKv, NodeEmpty, NodeType } from '../types';

import isNull from '@polkadot/util/is/null';

import { getNodeType } from './node';

/**
 * @name isEmptyNode
 * @signature isEmptyNode (node: Node): node is NodeEmpty
 * @summary Returns true if node is NULL
 * @description Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)
 */
export function isEmptyNode (node: Node): node is NodeEmpty {
  return isNull(node);
}

/**
 * @name isKvNode
 * @signature isKvNode (node: Node): node is NodeKv
 * @summary Returns true if node is not empty and contains a single key/value pair
 * @description Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)
 */
export function isKvNode (node: Node): node is NodeKv {
  return !isEmptyNode(node) && node.length === 2;
}

/**
 * @name isExtensionNode
 * @signature isExtensionNode (node: Node): node is NodeKv
 * @summary Returns true if node is an Extension 2-item node
 * @description Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)
 */
export function isExtensionNode (node: Node): node is NodeKv {
  return getNodeType(node) === NodeType.EXTENSION;
}

/**
 * @name isLeafNode
 * @signature isLeafNode (node: Node): node is NodeKv
 * @summary Returns true if node is an Leaf 2-item node
 * @description Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)
 */
export function isLeafNode (node: Node): node is NodeKv {
  return getNodeType(node) === NodeType.LEAF;
}

/**
 * @name isBranchNode
 * @signature isBranchNode (node: Node): node is NodeKv
 * @summary Returns true if node is an Branch 17-item node
 * @description Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)
 */
export function isBranchNode (node: Node): node is NodeBranch {
  return !isEmptyNode(node) && node.length === 17;
}
