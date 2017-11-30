// ISC, Copyright 2017 Jaco Greeff

const { isError } = require('./index');

describe('isError', () => {
  it('returns true when an Error value', () => {
    expect(
      isError(new Error('testing'))
    ).toEqual(true);
  });

  it('returns false on non-Error values', () => {
    expect(
      isError(0)
    ).toEqual(false);
  });
});
