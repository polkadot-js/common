// ISC, Copyright 2017 Jaco Greeff

const { isBoolean } = require('./index');

describe('isBoolean', () => {
  it('returns true on false', () => {
    expect(
      isBoolean(false)
    ).toEqual(true);
  });

  it('returns true on true', () => {
    expect(
      isBoolean(true)
    ).toEqual(true);
  });

  it('returns false on invalid booleans', () => {
    expect(
      isBoolean('notABool')
    ).toEqual(false);
  });
});
