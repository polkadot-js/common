// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

export default function nibblesFromU8a (key: Uint8Array | Buffer): Array<number> {
  const nibbles = [];

  for (let i = 0; i < key.length; i++) {
    const q = i * 2;

    nibbles[q] = key[i] >> 4;
    nibbles[q + 1] = key[i] % 16;
  }

  return nibbles;
}
