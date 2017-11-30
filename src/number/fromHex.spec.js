// ISC, Copyright 2017 Jaco Greeff

const isFunction = require('../is/function');

const { numberFromHex } = require('./index');

describe('numberFromHex', () => {
  it('exists as a function', () => {
    expect(
      isFunction(numberFromHex)
    ).toEqual(true);
  });
});
