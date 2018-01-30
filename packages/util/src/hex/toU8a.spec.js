// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { hexToU8a } = require('./index');

describe('hexToU8a', () => {
  it('returns an empty Uint8Array when null provided', () => {
    expect(
      hexToU8a(null)
    ).toHaveLength(0);
  });

  it('returns a Uint8Array with the correct values', () => {
    expect(
      hexToU8a('0x80000a')
    ).toEqual(
      new Uint8Array([128, 0, 10])
    );
  });

  it('returns a Uint8Array with the correct values (no prefix)', () => {
    expect(
      hexToU8a('80000a')
    ).toEqual(
      new Uint8Array([128, 0, 10])
    );
  });
});
