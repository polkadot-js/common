// Copyright 2017-2018 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Bytes, u16 as U16 } from '@polkadot/types';

import NodeHeader, { BranchHeader, NibbleHeader } from './NodeHeader';
import { NODE_TYPE_NULL, NODE_TYPE_BRANCH, NODE_TYPE_EXT, NODE_TYPE_LEAF } from './constants';

export default function decode (input: Uint8Array): null | Array<null | Uint8Array> {
  const header = new NodeHeader(input);
  const nodeType = header.nodeType;
  let offset = header.encodedLength;

  if (nodeType === NODE_TYPE_NULL) {
    return null;
  } else if (nodeType === NODE_TYPE_BRANCH) {
    const branch = header.value.raw as BranchHeader;
    const bitmap = new U16(input.subarray(offset)).toNumber();
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
    const extension = header.value.raw as NibbleHeader;
    const nibbleData = input.subarray(offset, (extension.toNumber() + 1) / 2);

    offset += nibbleData.length;

    // const nibble_slice = NibbleSlice::new_offset(nibble_data, nibble_count % 2);
    const value = new Bytes(input.subarray(offset)).toU8a(true);

    return [
      nibbleData,
      value
    ];
  }

  throw new Error('Unreachable');
}
