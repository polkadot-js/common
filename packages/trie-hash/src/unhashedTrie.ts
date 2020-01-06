// Copyright 2017-2020 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Codec } from '@polkadot/trie-codec/types';
import { TriePair } from './types';

import { toNibbles } from '@polkadot/trie-codec/util';
import { u8aToHex } from '@polkadot/util';

import buildTrie from './buildTrie';
import { DEFAULT_CODEC } from './defaults';

export default function unhashedTrie (input: TriePair[], codec: Codec = DEFAULT_CODEC): Uint8Array {
  const map: { [index: string]: TriePair } = {};

  input.forEach((pair): void => {
    map[u8aToHex(pair.k)] = pair;
  });

  const pairs = Object
    .keys(map)
    .sort()
    .map((key): TriePair => map[key])
    .map(({ k, v }): [Uint8Array, Uint8Array] => ([toNibbles(k), v] as [Uint8Array, Uint8Array]));

  return buildTrie(pairs, 0, codec);
}
