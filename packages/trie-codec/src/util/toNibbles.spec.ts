// Copyright 2017-2020 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import stringToU8a from '@polkadot/util/string/toU8a';

import toNibbles from './toNibbles';

describe('toNibbles', (): void => {
  it('converts an array', (): void => {
    expect(
      toNibbles(Uint8Array.from([
        0x31, 0x23, 0x45
      ]))
    ).toEqual(
      new Uint8Array([3, 1, 2, 3, 4, 5])
    );
  });

  it('converts a single', (): void => {
    expect(
      toNibbles(
        stringToU8a('A')
      )
    ).toEqual(
      new Uint8Array([4, 1])
    );
  });
});
