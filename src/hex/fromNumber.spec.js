// ISC, Copyright 2017 Jaco Greeff

const isFunction = require('../is/function');

const { hexFromNumber } = require('./index');

describe('hexFromNumber', () => {
  it('exists as a function', () => {
    expect(
      isFunction(hexFromNumber)
    ).toEqual(true);
  });
});
