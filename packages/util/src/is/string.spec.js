// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { isString } = require('./index');

describe('isString', () => {
  it('returns true on valid strings', () => {
    expect(
      isString('123')
    ).toEqual(true);
  });

  it('returns true on empty strings', () => {
    expect(
      isString('')
    ).toEqual(true);
  });

  it('returns false on invalid numbers', () => {
    expect(
      isString(2)
    ).toEqual(false);
  });
});
