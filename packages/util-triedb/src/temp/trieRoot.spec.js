// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const u8aFromString = require('@polkadot/util/u8a/fromString');
const hexToU8a = require('@polkadot/util/hex/toU8a');

const temp = require('./index')();

describe('trieRoot', () => {
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
