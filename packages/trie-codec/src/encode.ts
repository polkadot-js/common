// Copyright 2017-2020 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { compactAddLength, u8aConcat, isU8a, logger } from '@polkadot/util';

import NodeHeader from './NodeHeader';
import { BITMAP, NODE_TYPE_BRANCH, NODE_TYPE_EXT, NODE_TYPE_LEAF, NODE_TYPE_NULL } from './constants';
import { extractKey } from './nibbles';
import { fromNibbles } from './util';

const BRANCH_VALUE_INDEX = 16;
const EMPTY = new Uint8Array();

const l = logger('trie/codec');

l.noop();

// in the case of odd nibbles, the first byte is encoded as a single
// byte from the nibble, with the remainder of the nibbles is converted
// as nomral nibble combined bytes
function encodeKey (input: null | Uint8Array): Uint8Array {
  const nibbles = extractKey(input);

  // l.debug(() => ['encodeKey', { input, nibbles }]);

  return nibbles.length % 2
    ? u8aConcat(Uint8Array.from([nibbles[0]]), fromNibbles(nibbles.subarray(1)))
    : fromNibbles(nibbles);
}

function encodeValue (input: null | Uint8Array | (null | Uint8Array)[]): Uint8Array {
  if (!input) {
    return EMPTY;
  }

  // l.debug(() => ['encodeValue', { input, encoded }]);

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return compactAddLength(encode(input));
}

function _encodeBranch (header: NodeHeader, input: (null | Uint8Array)[]): Uint8Array {
  const values: Uint8Array[] = [];
  let bitmap = 0;

  for (let index = 0; index < BRANCH_VALUE_INDEX; index++) {
    const value = input[index];

    if (value) {
      bitmap |= BITMAP[index];

      values.push(encodeValue(value));
    }
  }

  return u8aConcat(
    header.toU8a(),
    new Uint8Array([(bitmap & 0xff), (bitmap >> 8)]),
    encodeValue(input[BRANCH_VALUE_INDEX]),
    ...values
  );
}

function _encodeKv (header: NodeHeader, input: (null | Uint8Array)[]): Uint8Array {
  const [path, value] = input;

  return u8aConcat(
    header.toU8a(),
    encodeKey(path),
    encodeValue(value)
  );
}

export default function encode (input?: null | Uint8Array | (null | Uint8Array)[]): Uint8Array {
  if (isU8a(input)) {
    return input;
  }

  const header = new NodeHeader(input);
  const nodeType = header.nodeType;

  if (!input || nodeType === NODE_TYPE_NULL) {
    return header.toU8a();
  } else if (nodeType === NODE_TYPE_BRANCH) {
    return _encodeBranch(header, input);
  } else if (nodeType === NODE_TYPE_EXT || nodeType === NODE_TYPE_LEAF) {
    return _encodeKv(header, input);
  }

  throw new Error('Unreachable');
}

// export default function encode (input?: null | Uint8Array | Array<null | Uint8Array>): Uint8Array {
//   const encoded = _encode(input);

//   // l.debug(() => ['encode', { input, encoded }]);

//   return encoded;
// }
