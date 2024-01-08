// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isError } from './index.js';

describe('isError', (): void => {
  it('returns true when an Error value', (): void => {
    expect(
      isError(new Error('testing'))
    ).toEqual(true);
  });

  it('returns false on non-Error values', (): void => {
    expect(
      isError(0)
    ).toEqual(false);
  });
});
