// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { arrayFilter } = require('./index');

describe('filterArray', () => {
  it('filters arrays, removing undefined', () => {
    expect(
      arrayFilter([0, '', null, false, void 0, NaN])
    ).toEqual([0, '', null, false, NaN]);
  });

  it('filters arrays, removing undefined & null (allowNull = false)', () => {
    expect(
      arrayFilter([0, '', null, false, void 0, NaN], false)
    ).toEqual([0, '', false, NaN]);
  });
});
