// ISC, Copyright 2017 Jaco Greeff

const { isString } = require('./index');

describe('isString', () => {
  it('returns true on valid strings', () => {
    expect(
      isString('123')
    ).toEqual(true);
  });

  it('returns true on empty strings', () => {
    expect(
      isString('')
    ).toEqual(true);
  });

  it('returns false on invalid numbers', () => {
    expect(
      isString(2)
    ).toEqual(false);
  });
});
