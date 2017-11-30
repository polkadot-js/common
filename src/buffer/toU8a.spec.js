// ISC, Copyright 2017 Jaco Greeff

const { bufferToU8a } = require('./index');

describe('bufferToU8a', () => {
  it('returns an empty buffer when null provided', () => {
    expect(
      bufferToU8a(null)
    ).toEqual(new Uint8Array([]));
  });

  it('returns a Uint8Buffer with the correct values', () => {
    expect(
      bufferToU8a(Buffer.from([128, 0, 10]))
    ).toEqual(new Uint8Array([128, 0, 10]));
  });

  it('throws error on non-Buffer inputs', () => {
    expect(
      () => bufferToU8a('notBuffer')
    ).toThrow(/Cannot convert non-/);
  });
});
