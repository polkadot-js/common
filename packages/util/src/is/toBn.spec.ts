// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import BN from 'bn.js';

import { isToBn } from './index.js';

describe('isToBn', (): void => {
  it('is false on no value', (): void => {
    expect(isToBn()).toEqual(false);
  });

  it('is false on non-compact value', (): void => {
    expect(isToBn(123)).toEqual(false);
  });

  it('is true when compact-like signature is found', (): void => {
    expect(isToBn({
      toBigInt: () => BigInt(1),
      toBn: () => new BN(1)
    })).toEqual(true);
  });
});
