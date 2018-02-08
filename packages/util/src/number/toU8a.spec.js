// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { numberToU8a } = require('./index');

describe('numberToU8a', () => {
  it('converts 0 to empty', () => {
    expect(
      numberToU8a(0)
    ).toEqual(new Uint8Array([]));
  });

  it('converts undefined to empty', () => {
    expect(
      numberToU8a()
    ).toEqual(new Uint8Array([]));
  });

  it('converts null to empty', () => {
    expect(
      numberToU8a(null)
    ).toEqual(new Uint8Array([]));
  });

  it('converts NaN to empty', () => {
    expect(
      numberToU8a(NaN)
    ).toEqual(new Uint8Array([]));
  });

  it('converts values to the buffer', () => {
    expect(
      numberToU8a(0x3456)
    ).toEqual(new Uint8Array([0x34, 0x56]));
  });
});
