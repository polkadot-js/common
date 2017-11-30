// ISC, Copyright 2017 Jaco Greeff

const isFunction = require('../is/function');

const { numberFromBuffer } = require('./index');

describe('numberFromBuffer', () => {
  it('exists as a function', () => {
    expect(
      isFunction(numberFromBuffer)
    ).toEqual(true);
  });
});
