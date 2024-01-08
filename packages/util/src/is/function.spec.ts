// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isFunction } from './index.js';

describe('isFunction', (): void => {
  it('returns true on valid functions', (): void => {
    expect(
      isFunction(isFunction)
    ).toEqual(true);
  });

  it('returns false on invalid functions', (): void => {
    expect(
      isFunction('notAFunction')
    ).toEqual(false);
  });
});
