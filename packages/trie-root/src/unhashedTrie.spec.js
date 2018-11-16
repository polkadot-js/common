// Copyright 2017-2018 @polkadot/trie-root authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { stringToU8a } from '@polkadot/util/index';

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

  // 0x922fa0ab17d1f383b45047502151d09e9141a76ddf5b5e4f1af98c4afdd85864
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
      0xfe, 0x0, 0xc, 0x10, 0x2, 0xa, 0x4, 0x10, 0x10, 0x2, 0xa, 0x4, 0x11
    ]));
  });

  // 0x3f6764bc812ca86b84cf88b2045828fd605c8abbe1e9c657ff87adb715c644bf
  it('encodes extension and branch', () => {
    expect(
      unhashedTrie([
        {
          k: Uint8Array.from([0xaa]),
          v: Uint8Array.from([0x10])
        },
        {
          k: Uint8Array.from([0xab]),
          v: Uint8Array.from([0x11])
        }
      ])
    ).toEqual(Uint8Array.from([
      0x81, 0xa, 0x2c, 0xfe, 0x0, 0xc, 0xc, 0x1, 0x4, 0x10, 0xc, 0x1, 0x4, 0x11
    ]))
  });

  // 0xc896ef26cd64107bd8bf33e9e0b0adbb29c54ac1bf8e9dc30153f13638095108
  it('encodes extension and branch with value', () => {
    expect(
      unhashedTrie([
        {
          k: Uint8Array.from([0xaa]),
          v: Uint8Array.from([0xa0])
        },
        {
          k: Uint8Array.from([0xaa, 0xaa]),
          v: Uint8Array.from([0xaa])
        },
        {
          k: Uint8Array.from([0xaa, 0xbb]),
          v: Uint8Array.from([0xab])
        }
      ])
    ).toEqual(Uint8Array.from([
      0x82, 0xaa, 0x3c, 0xff, 0x0, 0xc, 0x4, 0xa0, 0x10, 0x2, 0xa, 0x4, 0xaa, 0x10, 0x2, 0xb,
      0x4, 0xab
    ]));
  });

  // 0x519056dadff78abc057f6de56706d7b0ed01654b059df3dd9cfc135ef246dd22
  it('encodes bigger extension and branch with value', () => {
    expect(
      unhashedTrie([
        {
          k: Uint8Array.from([0xaa]),
          v: Uint8Array.from([0xa0])
        },
        {
          k: Uint8Array.from([0xaa, 0xaa]),
          v: Uint8Array.from([0xaa])
        },
        {
          k: Uint8Array.from([0xaa, 0xbb]),
          v: Uint8Array.from([0xab])
        },
        {
          k: Uint8Array.from([0xbb]),
          v: Uint8Array.from([0xb0])
        },
        {
          k: Uint8Array.from([0xbb, 0xbb]),
          v: Uint8Array.from([0xbb])
        },
        {
          k: Uint8Array.from([0xbb, 0xcc]),
          v: Uint8Array.from([0xbc])
        },
      ])
    ).toEqual(Uint8Array.from([
      0xfe, 0x0, 0xc, 0x48, 0x81, 0xa, 0x3c, 0xff, 0x0, 0xc, 0x4, 0xa0, 0x10, 0x2, 0xa, 0x4, 0xaa,
      0x10, 0x2, 0xb, 0x4, 0xab, 0x48, 0x81, 0xb, 0x3c, 0xff, 0x0, 0x18, 0x4, 0xb0, 0x10, 0x2,
      0xb, 0x4, 0xbb, 0x10, 0x2, 0xc, 0x4, 0xbc
    ]));
  });

  // 0x28530359d763dccdd0a6720aacdea9d03c4d93fa8b7c83e650ab159f1fa4675f
  it('encodes a single long leaf', () => {
    expect(
      unhashedTrie([
        {
          k: Uint8Array.from([0xaa]),
          v: stringToU8a('ABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABC')
        },
        {
          k: Uint8Array.from([0xba]),
          v: Uint8Array.from([0x11])
        }
      ])
    ).toEqual(Uint8Array.from([
      0xfe, 0x0, 0xc, 0x80, 0xe, 0x26, 0xe9,0x80, 0xa, 0xc2, 0x7f, 0x56, 0x5c, 0x7e, 0x7c, 0xa7,
      0x95, 0x16, 0x24, 0x78, 0x35, 0xea, 0x7, 0x6c, 0x5b, 0x62, 0x5f, 0x2d, 0x61, 0x0, 0x1a, 0x7b,
      0xab, 0xad, 0xbf, 0x11, 0x10, 0x2, 0xa, 0x4, 0x11
    ]))
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
