// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { hexToBuffer } = require('./index');

describe('hexToBuffer', () => {
  it('returns an empty buffer when null provided', () => {
    expect(
      hexToBuffer(null)
    ).toHaveLength(0);
  });

  it('returns a buffer with the correct values', () => {
    expect(
      Buffer.from([128, 0, 10]).equals(
        hexToBuffer('0x80000a')
      )
    ).toEqual(true);
  });

  it('returns a buffer with the correct values (no prefix)', () => {
    expect(
      Buffer.from([128, 0, 10]).equals(
        hexToBuffer('80000a')
      )
    ).toEqual(true);
  });
});
