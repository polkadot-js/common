// Copyright 2017-2018 @polkadot/util-triedb authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import u8aFromString from '@polkadot/util/u8a/fromString';
import hexToU8a from '@polkadot/util/hex/toU8a';

import factory from './index';

describe('trieRoot', () => {
  let temp;

  beforeEach(() => {
    temp = factory();
  });

  it('calculates the correct trieRoot', () => {
    temp.set(u8aFromString('doe'), u8aFromString('reindeer'));
    temp.set(u8aFromString('dog'), u8aFromString('puppy'));
    temp.set(u8aFromString('dogglesworth'), u8aFromString('cat'));

    expect(
      temp.trieRoot()
    ).toEqual(
      hexToU8a(
        '0x8aad789dff2f538bca5d8ea56e8abe10f4c7ba3a5dea95fea4cd6e7c3a1168d3'
      )
    );
  });
});
