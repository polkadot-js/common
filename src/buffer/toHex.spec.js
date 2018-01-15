// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { bufferToHex } = require('./index');

describe('bufferToHex', () => {
  it('returns 0x00 when the buffer is null', () => {
    expect(
      bufferToHex(null)
    ).toEqual('0x00');
  });

  it('returns the hex value for the buffer', () => {
    expect(
      bufferToHex(Buffer.from([128, 0, 10]))
    ).toEqual('0x80000a');
  });
});
