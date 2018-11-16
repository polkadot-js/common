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

  it('encodes a branch', () => {
    expect(
      unhashedTrie([
        {
          k: Uint8Array.from([0xaa]),
          v: Uint8Array.from([0x10])
        },
        {
          k: Uint8Array.from([0xba]),
          v: Uint8Array.from([0x11])
        }
      ])
    ).toEqual(Uint8Array.from([
      0xfe,
      0x0,
      0xc,
      0x10,
      0x2,
      0xa,
      0x4,
      0x10,
      0x10,
      0x2,
      0xa,
      0x4,
      0x11
    ]));
  });

  it('encodes 2 disjointed tuple keys', () => {
    expect(
      unhashedTrie([
        {
          k: Uint8Array.from([0x48, 0x19]),
          v: Uint8Array.from([0xfe])
        },
        {
          k: Uint8Array.from([0x13, 0x14]),
          v: Uint8Array.from([0xff])
        }
      ])
    ).toEqual(Uint8Array.from([
      0xfe,      // branch, no value
      0x12,      // slots 1 & 4 are taken from 0-7
      0x00,      // no slots from 8-15
      0x05 << 2, // first slot: LEAF, 5 bytes long.
      0x04,      // leaf with 3 nibbles
      0x03,      // first nibble
      0x14,      // second & third nibble
      0x01 << 2, // 1 byte data
      0xff,      // value data
      0x05 << 2, // second slot: LEAF, 5 bytes long.
      0x04,      // leaf with 3 nibbles
      0x08,      // first nibble
      0x19,      // second & third nibble
      0x01 << 2, // 1 byte data
      0xfe       // data
    ]))
  });
});
