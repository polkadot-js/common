// Copyright 2017-2018 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { decodeNibbles, isNibblesTerminated } from '@polkadot/trie-codec/nibbles';

import { BRANCH_NODE_NO_VALUE, BRANCH_NODE_WITH_VALUE, EMPTY_TRIE, EXTENSION_NODE_BIG, EXTENSION_NODE_OFFSET, EXTENSION_NODE_SMALL_MAX, EXTENSION_NODE_THRESHOLD, LEAF_NODE_BIG, LEAF_NODE_OFFSET, LEAF_NODE_SMALL_MAX, LEAF_NODE_THRESHOLD, NODE_TYPE_NULL, NODE_TYPE_BRANCH, NODE_TYPE_EXT, NODE_TYPE_LEAF } from './constants';

// FIXME These are not actually extending from types, we may want to bring
// that in if the dependency imports can be sorted out

type NodeType = 0 | 1 | 2 | 3;

export class Null {
}

export class BranchHeader extends Boolean {
}

export class NibbleHeader {
  private _value: number;

  constructor (input: number) {
    this._value = input;
  }

  toNumber (): number {
    return this._value;
  }
}

export class ExtensionHeader extends NibbleHeader {
}

export class LeafHeader extends NibbleHeader {
}

export default class NodeHeader {
  private _nodeType: NodeType;
  private _value: Null | BranchHeader | ExtensionHeader | LeafHeader;

  constructor (input?: null | Uint8Array | Array<null | Uint8Array>) {
    const [nodeType, value] = Array.isArray(input)
      ? NodeHeader.decodeNodeHeaderArray(input)
      : NodeHeader.decodeNodeHeaderU8a(input);

    this._nodeType = nodeType;
    this._value = value;
  }

  private static decodeNodeHeaderArray (input: Array<null | Uint8Array>): [NodeType, Null | BranchHeader | ExtensionHeader | LeafHeader] {
    if (input.length === 0) {
      return [
        NODE_TYPE_NULL,
        new Null()
      ];
    } else if (input.length === 2) {
      const nibbles = decodeNibbles(input[0]);
      const isTerminated = isNibblesTerminated(nibbles);

      if (isTerminated) {
        return [
          NODE_TYPE_LEAF,
          new LeafHeader(nibbles.length - 1)
        ];
      } else {
        return [
          NODE_TYPE_EXT,
          new ExtensionHeader(nibbles.length)
        ];
      }
    } else if (input.length === 17) {
      return [
        NODE_TYPE_BRANCH,
        new BranchHeader(!!input[16])
      ];
    }

    throw new Error('Unreachable');
  }

  private static decodeNodeHeaderU8a (input?: null | Uint8Array): [NodeType, Null | BranchHeader | ExtensionHeader | LeafHeader] {
    const firstByte = input
      ? input[0]
      : EMPTY_TRIE;

    if (!input || firstByte === EMPTY_TRIE) {
      return [NODE_TYPE_NULL, new Null()];
    } else if (firstByte === BRANCH_NODE_NO_VALUE) {
      return [NODE_TYPE_BRANCH, new BranchHeader(false)];
    } else if (firstByte === BRANCH_NODE_WITH_VALUE) {
      return [NODE_TYPE_BRANCH, new BranchHeader(true)];
    } else if (firstByte >= EXTENSION_NODE_OFFSET && firstByte <= EXTENSION_NODE_SMALL_MAX) {
      return [NODE_TYPE_EXT, new ExtensionHeader(firstByte - EXTENSION_NODE_OFFSET)];
    } else if (firstByte === EXTENSION_NODE_BIG) {
      return [NODE_TYPE_EXT, new ExtensionHeader(input[1] + EXTENSION_NODE_THRESHOLD)];
    } else if (firstByte >= LEAF_NODE_OFFSET && firstByte <= LEAF_NODE_SMALL_MAX) {
      return [NODE_TYPE_LEAF, new LeafHeader(firstByte - LEAF_NODE_OFFSET)];
    } else if (firstByte === LEAF_NODE_BIG) {
      return [NODE_TYPE_LEAF, new LeafHeader(input[1] + LEAF_NODE_THRESHOLD)];
    }

    throw new Error('Unreachable');
  }

  get encodedLength (): number {
    const nodeType = this.nodeType;

    if (nodeType === NODE_TYPE_NULL || nodeType === NODE_TYPE_BRANCH) {
      return 1;
    } else if (nodeType === NODE_TYPE_EXT) {
      const nibbleCount = (this.value as ExtensionHeader).toNumber();

      return nibbleCount < EXTENSION_NODE_THRESHOLD
        ? 1
        : 2;
    } else if (nodeType === NODE_TYPE_LEAF) {
      const nibbleCount = (this.value as LeafHeader).toNumber();

      return nibbleCount < LEAF_NODE_THRESHOLD
        ? 1
        : 2;
    }

    throw new Error('Unreachable');
  }

  get nodeType (): number {
    return this._nodeType;
  }

  get value (): Null | BranchHeader | ExtensionHeader | LeafHeader {
    return this._value;
  }

  toU8a (): Uint8Array {
    const nodeType = this.nodeType;

    if (nodeType === NODE_TYPE_NULL) {
      return new Uint8Array([EMPTY_TRIE]);
    } else if (nodeType === NODE_TYPE_BRANCH) {
      return new Uint8Array([
        (this.value as BranchHeader).valueOf() === true
          ? BRANCH_NODE_WITH_VALUE
          : BRANCH_NODE_NO_VALUE
      ]);
    } else if (nodeType === NODE_TYPE_EXT) {
      const nibbleCount = (this.value as ExtensionHeader).toNumber();

      if (nibbleCount < EXTENSION_NODE_THRESHOLD) {
        return new Uint8Array([EXTENSION_NODE_OFFSET + nibbleCount]);
      }

      return new Uint8Array([EXTENSION_NODE_BIG, nibbleCount - EXTENSION_NODE_THRESHOLD]);
    } else if (nodeType === NODE_TYPE_LEAF) {
      const nibbleCount = (this.value as LeafHeader).toNumber();

      if (nibbleCount < LEAF_NODE_THRESHOLD) {
        return new Uint8Array([LEAF_NODE_OFFSET + nibbleCount]);
      }

      return new Uint8Array([LEAF_NODE_BIG, nibbleCount - LEAF_NODE_THRESHOLD]);
    }

    throw new Error('Unreachable');
  }
}
