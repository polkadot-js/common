// ISC, Copyright 2017 Jaco Greeff

const isFunction = require('../is/function');

const { bnFromHex } = require('./index');

describe('bnFromHex', () => {
  it('exists as a function', () => {
    expect(
      isFunction(bnFromHex)
    ).toEqual(true);
  });
});
