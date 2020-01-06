// Copyright 2017-2020 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { decodeNibbles, isNibblesTerminated } from '@polkadot/trie-codec/nibbles';

import { BRANCH_NODE_NO_VALUE, BRANCH_NODE_WITH_VALUE, EMPTY_TRIE, EXTENSION_NODE_BIG, EXTENSION_NODE_OFFSET, EXTENSION_NODE_SMALL_MAX, EXTENSION_NODE_THRESHOLD, LEAF_NODE_BIG, LEAF_NODE_OFFSET, LEAF_NODE_SMALL_MAX, LEAF_NODE_THRESHOLD, NODE_TYPE_BRANCH, NODE_TYPE_EXT, NODE_TYPE_LEAF, NODE_TYPE_NULL } from './constants';

// FIXME These are not actually extending from types, we may want to bring
// that in if the dependency imports can be sorted out
type NodeType = 0 | 1 | 2 | 3;

export type Null = null;
export type BranchHeader = boolean;
export type NibbleHeader = number;
export type ExtensionHeader = NibbleHeader;
export type LeafHeader = NibbleHeader;

export default class NodeHeader {
  private _nodeType: NodeType;

  private _value: Null | BranchHeader | ExtensionHeader | LeafHeader;

  constructor (input?: null | Uint8Array | (null | Uint8Array)[]) {
    const [nodeType, value] = Array.isArray(input)
      ? NodeHeader.decodeNodeHeaderArray(input)
      : NodeHeader.decodeNodeHeaderU8a(input);

    this._nodeType = nodeType;
    this._value = value;
  }

  private static decodeNodeHeaderArray (input: (null | Uint8Array)[]): [NodeType, Null | BranchHeader | ExtensionHeader | LeafHeader] {
    if (input.length === 0) {
      return [NODE_TYPE_NULL, null];
    } else if (input.length === 2) {
      const nibbles = decodeNibbles(input[0]);
      const isTerminated = isNibblesTerminated(nibbles);

      return isTerminated
        ? [NODE_TYPE_LEAF, nibbles.length - 1]
        : [NODE_TYPE_EXT, nibbles.length];
    } else if (input.length === 17) {
      return [NODE_TYPE_BRANCH, !!input[16]];
    }

    throw new Error('Unreachable');
  }

  private static decodeNodeHeaderU8a (input?: null | Uint8Array): [NodeType, Null | BranchHeader | ExtensionHeader | LeafHeader] {
    const firstByte = input
      ? input[0]
      : EMPTY_TRIE;

    if (!input || firstByte === EMPTY_TRIE) {
      return [NODE_TYPE_NULL, null];
    } else if (firstByte === BRANCH_NODE_NO_VALUE) {
      return [NODE_TYPE_BRANCH, false];
    } else if (firstByte === BRANCH_NODE_WITH_VALUE) {
      return [NODE_TYPE_BRANCH, true];
    } else if (firstByte >= EXTENSION_NODE_OFFSET && firstByte <= EXTENSION_NODE_SMALL_MAX) {
      return [NODE_TYPE_EXT, firstByte - EXTENSION_NODE_OFFSET];
    } else if (firstByte === EXTENSION_NODE_BIG) {
      return [NODE_TYPE_EXT, input[1] + EXTENSION_NODE_THRESHOLD];
    } else if (firstByte >= LEAF_NODE_OFFSET && firstByte <= LEAF_NODE_SMALL_MAX) {
      return [NODE_TYPE_LEAF, firstByte - LEAF_NODE_OFFSET];
    } else if (firstByte === LEAF_NODE_BIG) {
      return [NODE_TYPE_LEAF, input[1] + LEAF_NODE_THRESHOLD];
    }

    throw new Error('Unreachable');
  }

  public get encodedLength (): number {
    switch (this.nodeType) {
      case NODE_TYPE_NULL:
      case NODE_TYPE_BRANCH:
        return 1;

      case NODE_TYPE_EXT:
        return (this.value as ExtensionHeader) < EXTENSION_NODE_THRESHOLD
          ? 1
          : 2;

      case NODE_TYPE_LEAF:
        return (this.value as LeafHeader) < LEAF_NODE_THRESHOLD
          ? 1
          : 2;

      default:
        throw new Error('Unreachable');
    }
  }

  public get nodeType (): number {
    return this._nodeType;
  }

  public get value (): Null | BranchHeader | ExtensionHeader | LeafHeader {
    return this._value;
  }

  public toU8a (): Uint8Array {
    switch (this.nodeType) {
      case NODE_TYPE_NULL:
        return new Uint8Array([EMPTY_TRIE]);

      case NODE_TYPE_BRANCH:
        return new Uint8Array([
          this.value as BranchHeader
            ? BRANCH_NODE_WITH_VALUE
            : BRANCH_NODE_NO_VALUE
        ]);

      case NODE_TYPE_EXT: {
        const nibbleCount = this.value as ExtensionHeader;

        return (nibbleCount < EXTENSION_NODE_THRESHOLD)
          ? new Uint8Array([EXTENSION_NODE_OFFSET + nibbleCount])
          : new Uint8Array([EXTENSION_NODE_BIG, nibbleCount - EXTENSION_NODE_THRESHOLD]);
      }

      case NODE_TYPE_LEAF: {
        const nibbleCount = this.value as LeafHeader;

        return (nibbleCount < LEAF_NODE_THRESHOLD)
          ? new Uint8Array([LEAF_NODE_OFFSET + nibbleCount])
          : new Uint8Array([LEAF_NODE_BIG, nibbleCount - LEAF_NODE_THRESHOLD]);
      }

      default:
        throw new Error('Unreachable');
    }
  }
}
