// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const isFunction = require('../is/function');

const { bufferFromU8a } = require('./index');

describe('bufferFromU8a', () => {
  it('exists as a function', () => {
    expect(
      isFunction(bufferFromU8a)
    ).toEqual(true);
  });
});
