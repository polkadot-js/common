// ISC, Copyright 2017 Jaco Greeff

const isFunction = require('../is/function');

const { hexFromBuffer } = require('./index');

describe('hexFromBuffer', () => {
  it('exists as a function', () => {
    expect(
      isFunction(hexFromBuffer)
    ).toEqual(true);
  });
});
