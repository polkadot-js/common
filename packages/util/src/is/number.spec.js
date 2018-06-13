// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { isNumber } = require('./index');

describe('isNumber', () => {
  it('returns true on valid numbers', () => {
    expect(
      isNumber(2)
    ).toEqual(true);
  });

  it('returns false on invalid numbers', () => {
    expect(
      isNumber('2')
    ).toEqual(false);
  });
});
