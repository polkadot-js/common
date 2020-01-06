// Copyright 2017-2020 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Codec } from '@polkadot/trie-codec/types';
import { Node, NodeType, NodeNotEmpty } from '../types';

import { decodeNibbles, isNibblesTerminated } from '@polkadot/trie-codec/nibbles';
import { isNull } from '@polkadot/util';

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

  throw new Error('Unable to determine node type');
}

export function decodeNode (codec: Codec, encoded: Uint8Array | Node): Node {
  if (isNull(encoded) || encoded.length === 0) {
    return null;
  } else if (Array.isArray(encoded)) {
    return encoded;
  }

  const node = codec.decode(encoded) as NodeNotEmpty;

  return node.map((value): Uint8Array | null =>
    value && value.length
      ? value
      : null
  ) as NodeNotEmpty;
}

export function encodeNode (codec: Codec, node: Node): Uint8Array {
  return codec.encode(node);
}
