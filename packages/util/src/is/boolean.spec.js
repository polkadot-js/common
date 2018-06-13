// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { isBoolean } = require('./index');

describe('isBoolean', () => {
  it('returns true on false', () => {
    expect(
      isBoolean(false)
    ).toEqual(true);
  });

  it('returns true on true', () => {
    expect(
      isBoolean(true)
    ).toEqual(true);
  });

  it('returns false on invalid booleans', () => {
    expect(
      isBoolean('notABool')
    ).toEqual(false);
  });
});
