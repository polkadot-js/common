// ISC, Copyright 2017 Jaco Greeff

const { bufferToHex } = require('./index');

describe('bufferToHex', () => {
  it('returns 0x when the buffer is null', () => {
    expect(
      bufferToHex(null)
    ).toEqual('0x');
  });

  it('returns the hex value for the buffer', () => {
    expect(
      bufferToHex(Buffer.from([128, 0, 10]))
    ).toEqual('0x80000a');
  });

  it('throws when non-buffer value is supplied', () => {
    expect(
      () => bufferToHex('noABuffer')
    ).toThrow(/Cannot convert non-buffer/);
  });
});
