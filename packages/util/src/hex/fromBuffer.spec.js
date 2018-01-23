// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const isFunction = require('../is/function');

const { hexFromBuffer } = require('./index');

describe('hexFromBuffer', () => {
  it('exists as a function', () => {
    expect(
      isFunction(hexFromBuffer)
    ).toEqual(true);
  });
});
