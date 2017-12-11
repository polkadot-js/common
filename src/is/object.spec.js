// ISC, Copyright 2017 Jaco Greeff

const { isObject } = require('./index');

describe('isObject', () => {
  it('returns true on valid objects', () => {
    expect(
      isObject({})
    ).toEqual(true);
  });

  it('returns false on invalid objects', () => {
    expect(
      isObject('notAnObject')
    ).toEqual(false);
  });
});
