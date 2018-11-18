// Copyright 2017-2018 @polkadot/trie-root authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { TriePair } from './types';

import { Compact } from '@polkadot/types/codec';

import trieRoot from './trieRoot';

export default function trieRootOrdered (input: Array<TriePair>): Uint8Array {
  return trieRoot(
    input.map(({ v }, index) => ({
      k: Compact.encodeU8a(index, 32),
      v
    }))
  );
}
