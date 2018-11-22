// Copyright 2017-2018 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aConcat } from '@polkadot/util/index';

import { BRANCH_NODE_NO_VALUE, BRANCH_NODE_WITH_VALUE } from '../constants';
import createValue from './createValue';

export default function createBranch (value: Uint8Array | null, hasChildren: Array<boolean>): Uint8Array {
  let cursor = 1;
  const bitmap = hasChildren.reduce((bitmap, value) => {
    if (value) {
      bitmap = bitmap | cursor;
    }

    cursor = cursor << 1;

    return bitmap;
  }, 0);

  return u8aConcat(
    Uint8Array.from([
      value
        ? BRANCH_NODE_WITH_VALUE
        : BRANCH_NODE_NO_VALUE,
      (bitmap % 256),
      Math.floor(bitmap / 256)
    ]),
    createValue(value)
  );
}
