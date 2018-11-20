// Copyright 2017-2018 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { compactAddLength, logger, u8aConcat } from '@polkadot/util/index';

import NodeHeader from './NodeHeader';
import { NODE_TYPE_BRANCH, NODE_TYPE_EXT, NODE_TYPE_LEAF, NODE_TYPE_NULL } from './constants';
import { extractKey } from './nibbles';
import { fromNibbles } from './util';

const EMPTY = new Uint8Array();
const BRANCH_VALUE_INDEX = 16;

const l = logger('trie/codec');

// in the case of odd nibbles, the first byte is encoded as a single
// byte from the nibble, with the remainder of the nibbles is converted
// as nomral nibble combined bytes
function encodeKey (input: null | Uint8Array, nodeType: number): Uint8Array {
  const nibbles = extractKey(input);

  l.debug(() => ['encodeKey', { input, nibbles, nodeType }]);

  return nibbles.length % 2
    ? u8aConcat(
      Uint8Array.from([nibbles[0]]),
      fromNibbles(nibbles.subarray(1))
    )
    : fromNibbles(nibbles);
}

function encodeValue (input: null | Uint8Array | Array<null | Uint8Array>, nodeType: number): Uint8Array {
  if (!input) {
    return EMPTY;
  }

  l.debug(() => ['encodeValue', { input, nodeType }]);

  return compactAddLength(
    Array.isArray(input)
      ? encode(input)
      : input
  );
}

function _encode (input?: null | Array<null | Uint8Array>): Uint8Array {
  const header = new NodeHeader(input);
  const nodeType = header.nodeType;
  const u8aHeader = header.toU8a();

  if (!input || nodeType === NODE_TYPE_NULL) {
    return u8aHeader;
  } else if (nodeType === NODE_TYPE_BRANCH) {
    let valuesU8a = EMPTY;
    let bitmap = 0;

    input.reduce((cursor, value, index) => {
      if ((index < BRANCH_VALUE_INDEX) && value) {
        bitmap = bitmap | cursor;

        valuesU8a = u8aConcat(
          valuesU8a,
          encodeValue(value, nodeType)
        );
      }

      return cursor << 1;
    }, 1);

    return u8aConcat(
      u8aHeader,
      new Uint8Array([(bitmap % 256), Math.floor(bitmap / 256)]),
      encodeValue(input[BRANCH_VALUE_INDEX], nodeType),
      valuesU8a
    );
  } else if (nodeType === NODE_TYPE_EXT || nodeType === NODE_TYPE_LEAF) {
    const [key, value] = input;

    return u8aConcat(
      u8aHeader,
      encodeKey(key, nodeType),
      encodeValue(value, nodeType)
    );
  }

  throw new Error('Unreachable');
}

export default function encode (input?: null | Array<null | Uint8Array>): Uint8Array {
  const encoded = _encode(input);

  l.debug(() => ['encode', { input, encoded }]);

  return encoded;
}
