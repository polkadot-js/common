// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { EnumType } from '@polkadot/types/codec';
import { bool as Bool, u8 as U8, u64 as U64 } from '@polkadot/types';
import { isU8a } from '@polkadot/util/index';

import { BRANCH_NODE_NO_VALUE, BRANCH_NODE_WITH_VALUE } from './constants';

class Branch extends Bool {
  constructor (value: Bool | Uint8Array | boolean) {
    super(
      Branch.decodeBranch(value)
    );
  }

  private static decodeBranch (value: Bool | Uint8Array | boolean): boolean {
    if (value instanceof Bool) {
      return value.valueOf();
    } else if (isU8a(value)) {
      if (value[0] === BRANCH_NODE_NO_VALUE) {
        return false;
      } else if (value[0] === BRANCH_NODE_WITH_VALUE) {
        return true;
      }

      throw new Error(`Unexpected branch value ${value[0]}`);
    }

    return value;
  }

  toU8a (isBare?: boolean): Uint8Array {
    return new Uint8Array(
      this.valueOf() === true
        ? BRANCH_NODE_WITH_VALUE
        : BRANCH_NODE_NO_VALUE
    );
  }
}

export class Extension extends U64 {

}

export class Leaf extends U64 {

}

export class Null extends U8 {
  constructor () {
    super(0);
  }
}

export default class NodeHeader extends EnumType<Null> {
  constructor (value: any) {
    super([
      Null,
      Branch,
      Extension,
      Leaf
    ]);
  }
}
