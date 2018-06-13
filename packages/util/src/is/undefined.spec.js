// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { isUndefined } = require('./index');

describe('isUndefined', () => {
  it('returns true on undefined values', () => {
    expect(
      isUndefined()
    ).toEqual(true);
  });

  it('returns false on defined values', () => {
    expect(
      isUndefined(null)
    ).toEqual(false);
  });
});
