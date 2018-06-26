// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

export default function nibblesToU8a (arr: Array<number>): Uint8Array {
  const u8a = new Uint8Array(arr.length / 2);

  for (let i = 0; i < u8a.length; i++) {
    const q = i * 2;

    u8a[i] = (arr[q] << 4) + arr[q + 1];
  }

  return u8a;
}
