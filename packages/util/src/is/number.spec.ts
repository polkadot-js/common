// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isNumber } from './index.js';

describe('isNumber', (): void => {
  it('returns true on valid numbers', (): void => {
    expect(
      isNumber(2)
    ).toEqual(true);
  });

  it('returns false on invalid numbers', (): void => {
    expect(
      isNumber('2')
    ).toEqual(false);
  });
});
