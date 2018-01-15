// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { numberToBuffer } = require('./index');

describe('numberToBuffer', () => {
  it('converts undefined to empty', () => {
    expect(
      numberToBuffer()
    ).toEqual(Buffer.from([]));
  });

  it('converts null to empty', () => {
    expect(
      numberToBuffer(null)
    ).toEqual(Buffer.from([]));
  });

  it('converts NaN to empty', () => {
    expect(
      numberToBuffer(NaN)
    ).toEqual(Buffer.from([]));
  });

  it('converts values to the buffer', () => {
    expect(
      numberToBuffer(0x3456)
    ).toEqual(Buffer.from([0x34, 0x56]));
  });
});
