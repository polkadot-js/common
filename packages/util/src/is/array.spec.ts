// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isArray } from './index.js';

describe('isArray', (): void => {
  it('is false on no value', (): void => {
    expect(isArray()).toEqual(false);
  });

  it('is false on non-array', (): void => {
    expect(isArray(123)).toEqual(false);
  });

  it('is true when Array is found', (): void => {
    expect(isArray([1, 2, 3])).toEqual(true);
  });
});
