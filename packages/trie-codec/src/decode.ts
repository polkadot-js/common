// Copyright 2017-2018 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { compactStripLength, logger } from '@polkadot/util/index';

import NodeHeader, { BranchHeader, NibbleHeader } from './NodeHeader';
import { NODE_TYPE_NULL, NODE_TYPE_BRANCH, NODE_TYPE_EXT, NODE_TYPE_LEAF } from './constants';
import { addNibblesTerminator, encodeNibbles } from './nibbles';
import { toNibbles } from './util';

const l = logger('trie/codec');

l.noop();

function _decode (input: null | Uint8Array): Uint8Array | null | Array<null | Uint8Array | [Uint8Array, Uint8Array]> {
  const header = new NodeHeader(input);
  const nodeType = header.nodeType;
  let offset = header.encodedLength;

  if (!input || nodeType === NODE_TYPE_NULL) {
    return input;
  } else if (nodeType === NODE_TYPE_BRANCH) {
    const branch = header.value as BranchHeader;
    const bitmap = input[offset] + (input[offset + 1] * 256);
    let value: null | Uint8Array = null;

    offset += 2;

    if (branch.valueOf() === true) {
      const [length, bytes] = compactStripLength(input.subarray(offset));

      value = bytes;
      offset += length;
    }

    let cursor = 1;

    return [
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
      null, null, null, null,
      value
    ].map((value, index) => {
      let result: null | Uint8Array | [Uint8Array, Uint8Array] = value;

      if ((index < 16) && (bitmap & cursor)) {
        const [length, bytes] = compactStripLength(input.subarray(offset));

        result = bytes.length === 32
          ? bytes
          : decode(bytes) as any;
        offset += length;
      }

      cursor = cursor << 1;

      return result;
    });
  } else if (nodeType === NODE_TYPE_EXT || nodeType === NODE_TYPE_LEAF) {
    const nibbleCount = (header.value as NibbleHeader).toNumber();
    const nibbleLength = Math.floor((nibbleCount + 1) / 2);
    const nibbleData = input.subarray(offset, offset + nibbleLength);

    // for off, ignore the first nibble, data starts at offset 1
    const nibbles = toNibbles(nibbleData).subarray(nibbleCount % 2);

    offset += nibbleData.length;

    const [_, value] = compactStripLength(input.subarray(offset));

    return [
      encodeNibbles(
        nodeType === NODE_TYPE_LEAF
          ? addNibblesTerminator(nibbles)
          : nibbles
      ),
      value
    ];
  }

  throw new Error('Unreachable');
}

export default function decode (input: null | Uint8Array): Uint8Array | null | Array<null | Uint8Array | Array<null | Uint8Array>> {
  const decoded = _decode(input);

  // l.debug(() => ['decode', { input, decoded }]);

  return decoded;
}
