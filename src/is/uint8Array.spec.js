// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { isUint8Array } = require('./index');

describe('isUint8Array', () => {
  it('returns false on undefined values', () => {
    expect(
      isUint8Array()
    ).toEqual(false);
  });

  it('returns false on Array values', () => {
    expect(
      isUint8Array([])
    ).toEqual(false);
  });

  it('returns true on Uint8Array values', () => {
    expect(
      isUint8Array(new Uint8Array([]))
    ).toEqual(true);
  });
});
