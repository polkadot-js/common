// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isToBigInt } from './index.js';

describe('isToBigInt', (): void => {
  it('is false on no value', (): void => {
    expect(isToBigInt()).toEqual(false);
  });

  it('is false on non-compact value', (): void => {
    expect(isToBigInt(123)).toEqual(false);
  });

  it('is true when compact-like signature is found', (): void => {
    expect(isToBigInt({
      toBigInt: () => BigInt(1)
    })).toEqual(true);
  });
});
