// Copyright 2017-2018 @polkadot/trie-root authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import unhashedTrie from './unhashedTrie';

describe('unhashedTrie', () => {
  it('encodes an empty into [0]', () => {
    expect(
      unhashedTrie([])
    ).toEqual(Uint8Array.from([
      0
    ]));
  });

  it('encodes a single tuple', () => {
    expect(
      unhashedTrie([{
        k: Uint8Array.from([0xaa]),
        v: Uint8Array.from([0xbb])
      }])
    ).toEqual(Uint8Array.from([
      0x03,   // leaf (0x01) with (+) key of 2 nibbles (0x02)
      0xaa,   // key data
      1 << 2, // length of value in bytes as Compact
      0xbb    // value data
    ]))
  });
});
