// Copyright 2017-2018 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import decode from './decode';

describe('decode', () => {
  it('decodes a leaf', () => {
    expect(
      decode(Uint8Array.from([
        0x05, 0x48, 0x19, 0x04, 0xfe
      ]))
    ).toEqual([
      Uint8Array.from([0x20, 0x48, 0x19]),
      Uint8Array.from([0xfe])
    ])
  });

  it('decodes a branch', () => {
    expect(
      decode(Uint8Array.from([
        0xfe, 0x00, 0x0c, 0x48, 0x81, 0x0a, 0x3c, 0xff, 0x00, 0x0c, 0x04, 0xa0, 0x10, 0x02, 0x0a, 0x04,
        0xaa, 0x10, 0x02, 0x0b, 0x04, 0xab, 0x10, 0x02, 0x0b, 0x04, 0xb0
      ]))
    ).toEqual([
      null, null, null, null, null, null, null, null, null, null,
      [
        Uint8Array.from([0, 10]),
        Uint8Array.from([255, 0, 12, 4, 160, 16, 2, 10, 4, 170, 16, 2, 11, 4, 171])
      ],
      [
        Uint8Array.from([32, 11]),
        Uint8Array.from([176])
      ],
      null, null, null, null, null
    ]);
  });
});
