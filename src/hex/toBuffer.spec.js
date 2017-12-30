// ISC, Copyright 2017 Jaco Greeff

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
});
