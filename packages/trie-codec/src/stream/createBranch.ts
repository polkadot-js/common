// Copyright 2017-2020 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aConcat } from '@polkadot/util';

import { BITMAP, BRANCH_NODE_NO_VALUE, BRANCH_NODE_WITH_VALUE } from '../constants';
import createValue from './createValue';

export default function createBranch (value: Uint8Array | null, hasChildren: boolean[]): Uint8Array {
  let bitmap = 0;

  for (let i = 0; i < hasChildren.length; i++) {
    if (hasChildren[i]) {
      bitmap |= BITMAP[i];
    }
  }

  return u8aConcat(
    Uint8Array.from([
      value
        ? BRANCH_NODE_WITH_VALUE
        : BRANCH_NODE_NO_VALUE,
      (bitmap & 0xff),
      (bitmap >> 8)
    ]),
    createValue(value)
  );
}
