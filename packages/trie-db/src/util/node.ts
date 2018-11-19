// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Node, NodeType, NodeNotEmpty } from '../types';

import codec from '@polkadot/trie-codec/index';
import { decodeNibbles, isNibblesTerminated } from '@polkadot/trie-codec/nibbles';

import { isNull } from '@polkadot/util/index';

import { isBranchNode, isEmptyNode, isKvNode } from './is';

export function getNodeType (node: Node): NodeType {
  if (isEmptyNode(node)) {
    return NodeType.EMPTY;
  } else if (isKvNode(node)) {
    const [key] = node;
    const nibbles = decodeNibbles(key);

    return isNibblesTerminated(nibbles)
      ? NodeType.LEAF
      : NodeType.EXTENSION;
  } else if (isBranchNode(node)) {
    return NodeType.BRANCH;
  }

  throw new Error(`Unable to determine node type`);
}

export function decodeNode (encoded: Uint8Array | Node): Node {
  if (isNull(encoded) || encoded.length === 0) {
    return null;
  } else if (Array.isArray(encoded)) {
    return encoded;
  }

  const node = codec.decode(encoded) as NodeNotEmpty;
  const decoded = node.map((value) =>
    value && value.length
      ? value
      : null
  );

  // console.error('decodeNode', encoded, '->', decoded);

  return decoded as NodeNotEmpty;
}

export function encodeNode (node: Node): Uint8Array {
  const encoded = codec.encode(node);

  // console.error('encodeNode', node, '->', encoded);

  return encoded;
}
