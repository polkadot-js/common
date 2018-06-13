// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { isError } = require('./index');

describe('isError', () => {
  it('returns true when an Error value', () => {
    expect(
      isError(new Error('testing'))
    ).toEqual(true);
  });

  it('returns false on non-Error values', () => {
    expect(
      isError(0)
    ).toEqual(false);
  });
});
