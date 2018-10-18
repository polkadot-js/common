// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Node, NodeBranch, NodeKv, NodeEmpty, NodeType } from '../types';

import { isNull } from '@polkadot/util/index';

import { getNodeType } from './node';

export function isEmptyNode (node: Node): node is NodeEmpty {
  return isNull(node);
}

export function isKvNode (node: Node): node is NodeKv {
  return !isEmptyNode(node) && node.length === 2;
}

export function isExtensionNode (node: Node): node is NodeKv {
  return getNodeType(node) === NodeType.EXTENSION;
}

export function isLeafNode (node: Node): node is NodeKv {
  return getNodeType(node) === NodeType.LEAF;
}

export function isBranchNode (node: Node): node is NodeBranch {
  return !isEmptyNode(node) && node.length === 17;
}
