// Copyright 2017-2018 @polkadot/trie-root authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { stream } from '@polkadot/trie-codec/index';
import { sharedPrefixLength } from '@polkadot/trie-codec/util';
import { u8aConcat } from '@polkadot/util/index';

const EMPTY = new Uint8Array();

function _buildTrie (input: Array<[Uint8Array, Uint8Array]>, cursor: number = 0): Uint8Array {
  if (input.length === 0) {
    return stream.createEmpty();
  }

  const [firstKey, firstValue] = input[0];

  if (input.length === 1) {
    return stream.createLeaf(firstKey.subarray(cursor), firstValue);
  }

  const sharedNibbleCount = input.reduce((min, [key], index) => {
    return index === 0
      ? key.length
      : Math.min(min, sharedPrefixLength(key, firstKey));
  }, 0);

  if (sharedNibbleCount > cursor) {
    return u8aConcat(
      stream.createExtension(firstKey.subarray(cursor, sharedNibbleCount)),
      stream.createSubstream(buildTrie(input, sharedNibbleCount))
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
      .filter((_, index) => index >= begin)
      .filter(([key]) => key[cursor] === index)
      .length;

    begin += sharedNibbleCounts[index];
  }

  begin = start;

  return u8aConcat(
    stream.createBranch(value, sharedNibbleCounts.map((value) => value > 0)),
    ...sharedNibbleCounts.map((count) => {
      let result = EMPTY;

      if (count > 0) {
        result = stream.createSubstream(buildTrie(input.slice(begin, begin + count), cursor + 1));
        begin += count;
      }

      return result;
    }),
    stream.endBranch(value)
  );
}

export default function buildTrie (input: Array<[Uint8Array, Uint8Array]>, cursor: number = 0): Uint8Array {
  const trie = _buildTrie(input, cursor);

  return trie;
}
