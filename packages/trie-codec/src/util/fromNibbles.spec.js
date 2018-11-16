// Copyright 2017-2018 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import stringToU8a from '@polkadot/util/string/toU8a';

import fromNibbles from './fromNibbles';

describe('fromNibbles', () => {
  it('converts a single', () => {
    expect(
      fromNibbles(
        new Uint8Array([4, 1])
      )
    ).toEqual(
      stringToU8a('A')
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
