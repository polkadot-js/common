// Copyright 2017-2018 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Compact } from '@polkadot/types/codec';
import { u8aConcat } from '@polkadot/util/index';

import NodeHeader from './NodeHeader';
import { NODE_TYPE_BRANCH, NODE_TYPE_EXT, NODE_TYPE_LEAF, NODE_TYPE_NULL } from './constants';
import { extractKey, decodeNibbles, removeNibblesTerminator } from './nibbles';
import { fromNibbles } from './util';

const EMPTY = new Uint8Array();

// FIXME This overlaps with what is done in stream (which is used in trie-root), extract
// the common checks and have the code to deal with encoding in a single place
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
        bitmap = bitmap | potCursor;

        if (Array.isArray(value)) {
          const [_key, _value] = value;
          const nibbles = removeNibblesTerminator(decodeNibbles(_key));
          const isOdd = (nibbles.length % 2) === 1;

          valuesU8a = u8aConcat(
            valuesU8a,
            Compact.addLengthPrefix(
              u8aConcat(
                new NodeHeader(value).toU8a(),
                isOdd
                  ? u8aConcat(
                    Uint8Array.from([nibbles[0]]),
                    fromNibbles(nibbles.subarray(1))
                  )
                  : _key,
                Compact.addLengthPrefix(_value)
              )
            )
          );
        } else {
          valuesU8a = u8aConcat(
            valuesU8a,
            Compact.addLengthPrefix(value)
          );
        }
      }

      potCursor = potCursor << 1;
    });

    const value = input[16];

    return u8aConcat(
      u8aHeader,
      new Uint8Array([(bitmap % 256), Math.floor(bitmap / 256)]),
      value
        ? Compact.addLengthPrefix(value)
        : EMPTY,
      valuesU8a
    );
  } else if (nodeType === NODE_TYPE_EXT || nodeType === NODE_TYPE_LEAF) {
    const [_, value] = input;
    const key = fromNibbles(extractKey(input));

    return u8aConcat(
      u8aHeader,
      key,
      value
        ? Compact.addLengthPrefix(value)
        : EMPTY
    );
  }

  throw new Error('Unreachable');
}
