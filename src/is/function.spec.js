// ISC, Copyright 2017-2018 Jaco Greeff

const { isFunction } = require('./index');

describe('isFunction', () => {
  it('returns true on valid functions', () => {
    expect(
      isFunction(isFunction)
    ).toEqual(true);
  });

  it('returns false on invalid functions', () => {
    expect(
      isFunction('notAFunction')
    ).toEqual(false);
  });
});
