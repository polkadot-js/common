// ISC, Copyright 2017 Jaco Greeff

const { isBuffer } = require('./index');

describe('isBuffer', () => {
  it('returns true when a Buffer value', () => {
    expect(
      isBuffer(Buffer.from([]))
    ).toEqual(true);
  });

  it('returns false on non-Buffer values', () => {
    expect(
      isBuffer(0)
    ).toEqual(false);
  });
});
