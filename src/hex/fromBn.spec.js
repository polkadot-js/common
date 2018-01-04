// ISC, Copyright 2017-2018 Jaco Greeff

const isFunction = require('../is/function');

const { hexFromBn } = require('./index');

describe('hexFromBn', () => {
  it('exists as a function', () => {
    expect(
      isFunction(hexFromBn)
    ).toEqual(true);
  });
});
