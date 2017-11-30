// ISC, Copyright 2017 Jaco Greeff

const { hexHasPrefix } = require('./index');

describe('hexHasPrefix', () => {
  it('returns true when hex prefix is found', () => {
    expect(
      hexHasPrefix('0x123')
    ).toEqual(true);
  });

  it('returns false when no prefix attached', () => {
    expect(
      hexHasPrefix('123')
    ).toEqual(false);
  });

  it('returns false when null value supplied', () => {
    expect(
      hexHasPrefix(null)
    ).toEqual(false);
  });

  it('returns false when non-string value supplied', () => {
    expect(
      hexHasPrefix(false)
    ).toEqual(false);
  });
});
