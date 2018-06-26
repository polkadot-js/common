// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

export default function matchingLength (nib1: Array<number>, nib2: Array<number>): number {
  let index = 0;

  while (nib1[index] === nib2[index] && nib1.length > index) {
    index++;
  }

  return index;
}
