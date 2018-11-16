// Copyright 2017-2018 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Bytes, u16 as U16 } from '@polkadot/types';
import { u8aConcat } from '@polkadot/util/index';

import NodeHeader from './NodeHeader';
import { NODE_TYPE_BRANCH, NODE_TYPE_EXT, NODE_TYPE_LEAF, NODE_TYPE_NULL } from './constants';

const EMPTY = new Uint8Array();

export default function encode (input?: null | Array<null | Uint8Array>): Uint8Array {
  const header = new NodeHeader(input);
  const nodeType = header.nodeType;
  const u8aHeader = header.toU8a();

  if (!input || nodeType === NODE_TYPE_NULL) {
    return u8aHeader;
  } else if (nodeType === NODE_TYPE_BRANCH) {
    let valuesU8a = EMPTY;
    let bitmap = 0;
    let potCursor = 1;

    input.forEach((value, index) => {
      if ((index < 16) && value) {
        bitmap = bitmap & potCursor;

        valuesU8a = u8aConcat(
          valuesU8a,
          new Bytes(value).toU8a()
        );
      }

      potCursor = potCursor << 1;
    });

    return u8aConcat(
      u8aHeader,
      new U16(bitmap).toU8a(),
      new Bytes(input[16] || EMPTY).toU8a(),
      valuesU8a
    );
  } else if (nodeType === NODE_TYPE_EXT || nodeType === NODE_TYPE_LEAF) {
    return u8aConcat(
      u8aHeader,
      input[0] || EMPTY,
      input[1] || EMPTY
    );
  }

  throw new Error('Unreachable');
}
