// ISC, Copyright 2017-2018 Jaco Greeff

const { bufferToNumber } = require('./index');

describe('bufferToNumber', () => {
  it('converts nothing to NaN', () => {
    expect(
      bufferToNumber()
    ).toEqual(NaN);
  });

  it('converts empty buffer to NaN', () => {
    expect(
      bufferToNumber(Buffer.from([]))
    ).toEqual(NaN);
  });

  it('converts a buffer to a value', () => {
    expect(
      bufferToNumber(Buffer.from([0x12, 0x34]))
    ).toEqual(0x1234);
  });
});
