// ISC, Copyright 2017-2018 Jaco Greeff

const { isNull } = require('./index');

describe('isNull', () => {
  it('returns true when a null value', () => {
    expect(
      isNull(null)
    ).toEqual(true);
  });

  it('returns false on non-null values', () => {
    expect(
      isNull()
    ).toEqual(false);
  });
});
