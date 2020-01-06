// Copyright 2017-2020 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Codec } from '@polkadot/trie-codec/types';

import { sharedPrefixLength } from '@polkadot/trie-codec/util';
import { u8aConcat } from '@polkadot/util';

import { DEFAULT_CODEC, DEFAULT_STREAM } from './defaults';

const EMPTY = new Uint8Array();

// FIXME This is problematic, the stream implementation is Substrate-only as is the branch here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _buildTrie (input: [Uint8Array, Uint8Array][], cursor: number, codec: Codec, stream: any): Uint8Array {
  if (input.length === 0) {
    return stream.createEmpty();
  }

  const [firstKey, firstValue] = input[0];

  if (input.length === 1) {
    return stream.createLeaf(firstKey.subarray(cursor), firstValue);
  }

  const sharedNibbleCount = input.reduce((min, [key], index): number => {
    return index === 0
      ? key.length
      : Math.min(min, sharedPrefixLength(key, firstKey));
  }, 0);

  if (sharedNibbleCount > cursor) {
    return u8aConcat(
      stream.createExtension(firstKey.subarray(cursor, sharedNibbleCount)),
      stream.createSubstream(
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        buildTrie(input, sharedNibbleCount, codec, stream)
      )
    );
  }

  const value = firstKey.length === cursor
    ? firstValue
    : null;
  const sharedNibbleCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const start = value ? 1 : 0;
  let begin = start;

  for (let index = 0; index < 16; index++) {
    sharedNibbleCounts[index] = input
      .filter((_, index): boolean => index >= begin)
      .filter(([key]): boolean => key[cursor] === index)
      .length;

    begin += sharedNibbleCounts[index];
  }

  begin = start;

  return u8aConcat(
    stream.createBranch(value, sharedNibbleCounts.map((value): boolean => value > 0)),
    ...sharedNibbleCounts.map((count): Uint8Array => {
      let result = EMPTY;

      if (count > 0) {
        result = stream.createSubstream(
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          buildTrie(input.slice(begin, begin + count), cursor + 1, codec, stream)
        );
        begin += count;
      }

      return result;
    }),
    stream.endBranch(value)
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function buildTrie (input: [Uint8Array, Uint8Array][], cursor = 0, codec: Codec = DEFAULT_CODEC, stream: any = DEFAULT_STREAM): Uint8Array {
  const trie = _buildTrie(input, cursor, codec, stream);

  return trie;
}
