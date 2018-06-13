// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { isObject } = require('./index');

describe('isObject', () => {
  it('returns true on valid objects', () => {
    expect(
      isObject({})
    ).toEqual(true);
  });

  it('returns false on invalid objects', () => {
    expect(
      isObject('notAnObject')
    ).toEqual(false);
  });
});
