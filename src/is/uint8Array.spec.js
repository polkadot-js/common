// ISC, Copyright 2017 Jaco Greeff

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
