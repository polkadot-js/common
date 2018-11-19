// Copyright 2017-2018 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Compact } from '@polkadot/types/codec';
import { u8aConcat } from '@polkadot/util/index';

import NodeHeader from './NodeHeader';
import { NODE_TYPE_BRANCH, NODE_TYPE_EXT, NODE_TYPE_LEAF, NODE_TYPE_NULL } from './constants';
import { extractKey } from './nibbles';
import { fromNibbles } from './util';

const EMPTY = new Uint8Array();
const BRANCH_VALUE_INDEX = 16;

function encodeValue (input: null | Uint8Array | Array<null | Uint8Array>): Uint8Array {
  if (!input) {
    return EMPTY;
  }

  return Compact.addLengthPrefix(
    Array.isArray(input)
      ? encode(input)
      : input
  );
}

export default function encode (input?: null | Array<null | Uint8Array>): Uint8Array {
  console.error('encode', input);

  const header = new NodeHeader(input);
  const nodeType = header.nodeType;
  const u8aHeader = header.toU8a();

  if (!input || nodeType === NODE_TYPE_NULL) {
    return u8aHeader;
  } else if (nodeType === NODE_TYPE_BRANCH) {
    let valuesU8a = EMPTY;
    let bitmap = 0;
    let cursor = 1;

    input.forEach((value, index) => {
      if ((index < BRANCH_VALUE_INDEX) && value) {
        bitmap = bitmap | cursor;

        valuesU8a = u8aConcat(
          valuesU8a,
          encodeValue(value)
        );
      }

      cursor = cursor << 1;
    });

    return u8aConcat(
      u8aHeader,
      new Uint8Array([(bitmap % 256), Math.floor(bitmap / 256)]),
      encodeValue(input[BRANCH_VALUE_INDEX]),
      valuesU8a
    );
  } else if (nodeType === NODE_TYPE_EXT || nodeType === NODE_TYPE_LEAF) {
    const [_, value] = input;
    const nibbles = extractKey(input);

    // in the case of odd nibbles, the first byte is encoded as a single
    // byte from the nibble, with the remainder of the nibbles is converted
    // as nomral nibble combined bytes
    const key = nibbles.length % 2
      ? u8aConcat(
        Uint8Array.from([nibbles[0]]),
        fromNibbles(nibbles.subarray(1))
      )
      : fromNibbles(nibbles);

    return u8aConcat(
      u8aHeader,
      key,
      encodeValue(value)
    );
  }

  throw new Error('Unreachable');
}
