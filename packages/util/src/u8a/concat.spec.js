// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { u8aConcat } = require('./index');

describe('u8aConcat', () => {
  it('concatenates arrays', () => {
    expect(
      u8aConcat([
        new Uint8Array([1, 2, 3, 4]),
        new Uint8Array([5, 6]),
        new Uint8Array([7, 8, 9])
      ])
    ).toEqual(
      new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9])
    );
  });
});
