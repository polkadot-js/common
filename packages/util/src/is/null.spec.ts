// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isNull } from './index.js';

describe('isNull', (): void => {
  it('returns true when a null value', (): void => {
    expect(
      isNull(null)
    ).toEqual(true);
  });

  it('returns false on non-null values', (): void => {
    expect(
      isNull()
    ).toEqual(false);
  });
});
