// ISC, Copyright 2017 Jaco Greeff

const isFunction = require('../is/function');

const { u8aFromBuffer } = require('./index');

describe('u8aFromBuffer', () => {
  it('exists as a function', () => {
    expect(
      isFunction(u8aFromBuffer)
    ).toEqual(true);
  });
});
