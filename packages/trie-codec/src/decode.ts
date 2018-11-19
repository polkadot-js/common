// Copyright 2017-2018 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Bytes } from '@polkadot/types';
import { u8aConcat } from '@polkadot/util/index';

import NodeHeader, { BranchHeader, NibbleHeader } from './NodeHeader';
import { NODE_TYPE_NULL, NODE_TYPE_BRANCH, NODE_TYPE_EXT, NODE_TYPE_LEAF } from './constants';
import { toNibbles } from './util';

export default function decode (input?: null | Uint8Array): null | Array<null | Uint8Array> {
  const header = new NodeHeader(input);
  const nodeType = header.nodeType;
  let offset = header.encodedLength;

  if (!input || nodeType === NODE_TYPE_NULL) {
    return null;
  } else if (nodeType === NODE_TYPE_BRANCH) {
    const branch = header.value as BranchHeader;
    const bitmap = input[offset] + (input[offset + 1] * 256);
    let value: null | Uint8Array = null;
    let potCursor = 1;

    offset += 2;

    if (branch.valueOf() === true) {
      const bytes = new Bytes(input.subarray(offset));

      value = bytes.toU8a(true);
      offset += bytes.encodedLength;
    }

    return [
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
      value
    ].map((value, index) => {
      let result: null | Uint8Array = value;

      if ((index < 16) && (bitmap & potCursor)) {
        const bytes = new Bytes(input.subarray(offset));

        result = bytes.toU8a(true);
        offset += bytes.encodedLength;
      }

      potCursor = potCursor << 1;

      return result;
    });
  } else if (nodeType === NODE_TYPE_EXT || nodeType === NODE_TYPE_LEAF) {
    const nibbleCount = (header.value as NibbleHeader).toNumber();
    const nibbleLength = Math.floor((nibbleCount + 1) / 2);
    const nibbleData = input.subarray(offset, offset + nibbleLength);

    console.error('nodeType', nodeType, nibbleCount, toNibbles(nibbleData));

    offset += nibbleData.length;

    // const nibble_slice = NibbleSlice::new_offset(nibble_data, nibble_count % 2);
    const bytes = new Bytes(input.subarray(offset));

    return [
      u8aConcat(
        nodeType === NODE_TYPE_LEAF
          ? new Uint8Array([0x20])
          : new Uint8Array(),
        nibbleData
      ),
      bytes.toU8a(true)
    ];
  }

  throw new Error('Unreachable');
}
