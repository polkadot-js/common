// ISC, Copyright 2017 Jaco Greeff

const { u8aToBuffer } = require('./index');

describe('u8aToBuffer', () => {
  it('returns [] when the buffer is null', () => {
    expect(
      u8aToBuffer(null)
    ).toEqual(Buffer.from([]));
  });

  it('returns the Buffer value for the Uint8Array', () => {
    expect(
      u8aToBuffer(new Uint8Array([128, 0, 10]))
    ).toEqual(Buffer.from([128, 0, 10]));
  });
});
