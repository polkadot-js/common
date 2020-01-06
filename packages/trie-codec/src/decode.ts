// Copyright 2017-2020 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { compactStripLength, logger } from '@polkadot/util';

import NodeHeader, { BranchHeader, NibbleHeader } from './NodeHeader';
import { BITMAP, NODE_TYPE_BRANCH, NODE_TYPE_EXT, NODE_TYPE_LEAF, NODE_TYPE_NULL } from './constants';
import { addNibblesTerminator, encodeNibbles } from './nibbles';
import { toNibbles } from './util';

const EMPTY_BRANCH: (Uint8Array | null)[] = [
  null, null, null, null,
  null, null, null, null,
  null, null, null, null,
  null, null, null, null
];
const l = logger('trie/codec');

l.noop();

function _decodeBranch (header: NodeHeader, input: Uint8Array): (null | Uint8Array | [Uint8Array, Uint8Array])[] {
  let offset = header.encodedLength;
  const branch = header.value as BranchHeader;
  const bitmap = input[offset] + (input[offset + 1] << 8);
  let value: null | Uint8Array;

  offset += 2;

  if (branch === true) {
    const [length, bytes] = compactStripLength(input.subarray(offset));

    value = bytes;
    offset += length;
  } else {
    value = null;
  }

  return EMPTY_BRANCH.concat(value).map((value, index): null | Uint8Array | [Uint8Array, Uint8Array] => {
    let result: null | Uint8Array | [Uint8Array, Uint8Array] = value;

    if ((index < 16) && (bitmap & BITMAP[index])) {
      const [length, bytes] = compactStripLength(input.subarray(offset));

      result = bytes.length === 32
        ? bytes
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        : decode(bytes) as Uint8Array;
      offset += length;
    }

    return result;
  });
}

function _decodeKv (header: NodeHeader, input: Uint8Array): (null | Uint8Array | [Uint8Array, Uint8Array])[] {
  const offset = header.encodedLength;
  const nibbleCount = (header.value as NibbleHeader);
  const nibbleLength = (nibbleCount + 1) >> 1;
  const nibbleData = input.subarray(offset, offset + nibbleLength);

  // for odd, ignore the first nibble, data starts at offset 1
  const nibbles = toNibbles(nibbleData).subarray(nibbleCount % 2);
  const [, value] = compactStripLength(input.subarray(offset + nibbleData.length));

  return [
    encodeNibbles(
      header.nodeType === NODE_TYPE_LEAF
        ? addNibblesTerminator(nibbles)
        : nibbles
    ),
    value
  ];
}

export default function decode (input: null | Uint8Array): Uint8Array | null | (null | Uint8Array | [Uint8Array, Uint8Array])[] {
  const header = new NodeHeader(input);
  const nodeType = header.nodeType;

  if (!input || nodeType === NODE_TYPE_NULL) {
    return input;
  } else if (nodeType === NODE_TYPE_BRANCH) {
    return _decodeBranch(header, input);
  } else if (nodeType === NODE_TYPE_EXT || nodeType === NODE_TYPE_LEAF) {
    return _decodeKv(header, input);
  }

  throw new Error('Unreachable');
}

// export default function decode (input: null | Uint8Array): Uint8Array | null | Array<null | Uint8Array | Array<null | Uint8Array>> {
//   const decoded = _decode(input);

//   // l.debug(() => ['decode', { input, decoded }]);

//   return decoded;
// }
