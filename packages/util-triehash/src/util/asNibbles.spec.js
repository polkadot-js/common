// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const u8aFromString = require('@polkadot/util/u8a/fromString');

const asNibbles = require('./asNibbles');

describe('asNibbles', () => {
  it('converts an array', () => {
    expect(
      asNibbles([
        0x31, 0x23, 0x45
      ])
    ).toEqual(
      new Uint8Array([3, 1, 2, 3, 4, 5])
    );
  });

  it('converts a single', () => {
    expect(
      asNibbles(
        u8aFromString('A')
      )
    ).toEqual(
      new Uint8Array([4, 1])
    );
  });
});
