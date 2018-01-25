// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const isFunction = require('../is/function');

const { bufferFromNumber } = require('./index');

describe('bufferFromNumber', () => {
  it('exists as a function', () => {
    expect(
      isFunction(bufferFromNumber)
    ).toEqual(true);
  });
});
