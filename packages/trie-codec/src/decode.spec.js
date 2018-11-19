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
});
