// ISC, Copyright 2017 Jaco Greeff

const { isHex } = require('./index');

describe('isHex', () => {
  const test = '123abcd45';

  it('returns true on hex values', () => {
    expect(
      isHex(`0x${test}`)
    ).toEqual(true);
  });

  it('returns true on uppercase values', () => {
    expect(
      isHex(`0x${test.toUpperCase()}`)
    ).toEqual(true);
  });

  it('return false on hex values unprefixed', () => {
    expect(
      isHex(test)
    ).toEqual(false);
  });

  it('returns false on non-string values', () => {
    expect(
      isHex(false)
    ).toEqual(false);
  });
});
