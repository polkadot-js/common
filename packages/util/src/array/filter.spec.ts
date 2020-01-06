// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { arrayFilter } from '.';

describe('filterArray', (): void => {
  it('filters arrays, removing undefined', (): void => {
    expect(
      arrayFilter([0, '', null, false, undefined, NaN])
    ).toEqual([0, '', null, false, NaN]);
  });

  it('filters arrays, removing undefined & null (allowNull = false)', (): void => {
    expect(
      arrayFilter([0, '', null, false, undefined, NaN], false)
    ).toEqual([0, '', false, NaN]);
  });
});
