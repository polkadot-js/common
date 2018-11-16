// Copyright 2017-2018 @polkadot/trie-root authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { TriePair } from './types';

import { toNibbles } from '@polkadot/trie-codec/util';
import { u8aToHex } from '@polkadot/util/index';

import buildTrie from './buildTrie';

export default function unhashedTrie (input: Array<TriePair>): Uint8Array {
  const map = input.reduce((result, pair) => {
    result[u8aToHex(pair.k)] = pair;

    return result;
  }, ({} as { [index: string]: TriePair }));

  return buildTrie(
    Object
      .keys(map)
      .sort()
      .map((key) => map[key])
      .map(({ k, v }) => ([toNibbles(k), v] as [Uint8Array, Uint8Array]))
  );
}
