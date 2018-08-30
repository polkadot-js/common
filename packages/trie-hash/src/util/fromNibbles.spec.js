// Copyright 2017-2018 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import u8aFromString from '@polkadot/util/u8a/fromString';

import fromNibbles from './fromNibbles';

describe('fromNibbles', () => {
  it('converts a single', () => {
    expect(
      fromNibbles(
        new Uint8Array([4, 1])
      )
    ).toEqual(
      u8aFromString('A')
    );
  });

  it('converts an number of values', () => {
    expect(
      fromNibbles(
        new Uint8Array([3, 1, 2, 3, 4, 5])
      )
    ).toEqual(
      new Uint8Array([0x31, 0x23, 0x45])
    );
  });

  it('converts an number of values (array)', () => {
    expect(
      fromNibbles(
        [3, 1, 2, 3, 4, 5, 7, 8]
      )
    ).toEqual(
      new Uint8Array([0x31, 0x23, 0x45, 0x78])
    );
  });
});
