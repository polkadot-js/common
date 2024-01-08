// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isFunction } from '../is/function.js';
import { bnFromHex } from './index.js';

describe('bnFromHex', (): void => {
  it('exists as a function', (): void => {
    expect(
      isFunction(bnFromHex)
    ).toEqual(true);
  });
});
