// Copyright 2017-2019 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Codec } from '@polkadot/trie-codec/types';
import { TriePair } from './types';

import { toNibbles } from '@polkadot/trie-codec/util';
import { u8aToHex } from '@polkadot/util/index';

import buildTrie from './buildTrie';
import { DEFAULT_CODEC } from './defaults';

export default function unhashedTrie (input: Array<TriePair>, codec: Codec = DEFAULT_CODEC): Uint8Array {
  const map = input.reduce((result, pair) => {
    result[u8aToHex(pair.k)] = pair;

    return result;
  }, ({} as { [index: string]: TriePair }));
  const pairs = Object
    .keys(map)
    .sort()
    .map((key) => map[key])
    .map(({ k, v }) => ([toNibbles(k), v] as [Uint8Array, Uint8Array]));

  return buildTrie(pairs, 0, codec);
}
