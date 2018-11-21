// Copyright 2017-2018 @polkadot/trie-root authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Codec } from '@polkadot/trie-codec/types';
import { TriePair } from './types';

import { compactToU8a } from '@polkadot/util/index';

import { DEFAULT_CODEC } from './defaults';
import trieRoot from './trieRoot';

export default function trieRootOrdered (input: Array<TriePair>, codec: Codec = DEFAULT_CODEC): Uint8Array {
  return trieRoot(
    input.map(({ v }, index) => ({
      k: compactToU8a(index),
      v
    })),
    codec
  );
}
