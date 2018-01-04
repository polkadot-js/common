// ISC, Copyright 2017-2018 Jaco Greeff

const isFunction = require('../is/function');

const { bufferFromHex } = require('./index');

describe('bufferFromHex', () => {
  it('exists as a function', () => {
    expect(
      isFunction(bufferFromHex)
    ).toEqual(true);
  });
});
