// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { EnumType } from '@polkadot/types/codec';
import { bool as Bool, u8 as U8, u64 as U64 } from '@polkadot/types';

import { BRANCH_NODE_NO_VALUE, BRANCH_NODE_WITH_VALUE, EMPTY_TRIE, EXTENSION_NODE_BIG, EXTENSION_NODE_OFFSET, EXTENSION_NODE_SMALL_MAX, EXTENSION_NODE_THRESHOLD, LEAF_NODE_BIG, LEAF_NODE_OFFSET, LEAF_NODE_SMALL_MAX, LEAF_NODE_THRESHOLD } from './constants';

export class Branch extends Bool {
}

export class Extension extends U64 {
}

export class Leaf extends U64 {
}

export class Null extends U8 {
}

export default class NodeHeader extends EnumType<Null | Branch | Extension | Leaf> {
  constructor (input: any) {
    const [index, value] = NodeHeader.decodeNodeHeader(input);

    super([
      Null, // 0
      Branch, // 1
      Extension, // 2
      Leaf // 3
    ], value, index);
  }

  private static decodeNodeHeader (input: Uint8Array): [number, Null | Branch | Extension | Leaf] {
    const firstByte = input[0];

    if (firstByte === EMPTY_TRIE) {
      return [0, new Null()];
    } else if (firstByte >= LEAF_NODE_OFFSET && firstByte <= LEAF_NODE_SMALL_MAX) {
      return [3, new Leaf(firstByte - LEAF_NODE_OFFSET)];
    } else if (firstByte === LEAF_NODE_BIG) {
      return [3, new Leaf(input[1] + LEAF_NODE_THRESHOLD)];
    } else if (firstByte >= EXTENSION_NODE_OFFSET && firstByte <= EXTENSION_NODE_SMALL_MAX) {
      return [2, new Extension(input[1] - EXTENSION_NODE_OFFSET)];
    } else if (firstByte === EXTENSION_NODE_BIG) {
      return [2, new Extension(input[1] + EXTENSION_NODE_THRESHOLD)];
    } else if (firstByte === BRANCH_NODE_NO_VALUE) {
      return [1, new Branch(false)];
    } else if (firstByte === BRANCH_NODE_WITH_VALUE) {
      return [1, new Branch(true)];
    }

    throw new Error('Unreachable');
  }

  toU8a (isBare?: boolean): Uint8Array {
    switch (this.toNumber()) {
      case 0:
        return new Uint8Array(1);

      case 1:
        return new Uint8Array(
          (this.value.raw as Branch).valueOf() === true
            ? BRANCH_NODE_WITH_VALUE
            : BRANCH_NODE_NO_VALUE
        );

      case 2: {
        const nibbleCount = (this.value.raw as Extension).toNumber();

        if (nibbleCount < EXTENSION_NODE_THRESHOLD) {
          return new Uint8Array([EXTENSION_NODE_OFFSET + nibbleCount]);
        }

        return new Uint8Array([
          EXTENSION_NODE_BIG,
          nibbleCount - EXTENSION_NODE_THRESHOLD
        ]);
      }

      case 3: {
        const nibbleCount = (this.value.raw as Leaf).toNumber();

        if (nibbleCount < LEAF_NODE_THRESHOLD) {
          return new Uint8Array([LEAF_NODE_OFFSET + nibbleCount]);
        }

        return new Uint8Array([
          LEAF_NODE_BIG,
          nibbleCount - LEAF_NODE_THRESHOLD
        ]);
      }

      default:
        throw new Error('Unreachable');
    }
  }
}
