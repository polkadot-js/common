// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { arrayFilter } from './index.js';

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
