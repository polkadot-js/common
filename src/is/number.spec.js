// ISC, Copyright 2017 Jaco Greeff

const { isNumber } = require('./index');

describe('isNumber', () => {
  it('returns true on valid numbers', () => {
    expect(
      isNumber(2)
    ).toEqual(true);
  });

  it('returns false on invalid numbers', () => {
    expect(
      isNumber('2')
    ).toEqual(false);
  });
});
