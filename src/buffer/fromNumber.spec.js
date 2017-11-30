// ISC, Copyright 2017 Jaco Greeff

const isFunction = require('../is/function');

const { bufferFromNumber } = require('./index');

describe('bufferFromNumber', () => {
  it('exists as a function', () => {
    expect(
      isFunction(bufferFromNumber)
    ).toEqual(true);
  });
});
