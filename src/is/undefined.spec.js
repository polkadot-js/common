// ISC, Copyright 2017 Jaco Greeff

const { isUndefined } = require('./index');

describe('isUndefined', () => {
  it('returns true on undefined values', () => {
    expect(
      isUndefined()
    ).toEqual(true);
  });

  it('returns false on defined values', () => {
    expect(
      isUndefined(null)
    ).toEqual(false);
  });
});
