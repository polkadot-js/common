// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import matchingLength from './matchingLength';

export default function isEqual (keyA: Array<number>, keyB: Array<number>) {
  const length = matchingLength(keyA, keyB);

  return length === keyA.length && length === keyB.length;
}
