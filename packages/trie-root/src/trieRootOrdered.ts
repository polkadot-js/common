// Copyright 2017-2018 @polkadot/trie-root authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { TriePair } from './types';

import { compactToU8a } from '@polkadot/util/index';

import trieRoot from './trieRoot';

export default function trieRootOrdered (input: Array<TriePair>): Uint8Array {
  return trieRoot(
    input.map(({ v }, index) => ({
      k: compactToU8a(index),
      v
    }))
  );
}
