// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import BN from 'bn.js';

import { isCompact } from './index.js';

describe('isCompact', (): void => {
  it('is false on no value', (): void => {
    expect(isCompact()).toEqual(false);
  });

  it('is false on non-compact value', (): void => {
    expect(isCompact(123)).toEqual(false);
  });

  it('is true when compact-like signature is found', (): void => {
    expect(isCompact({
      toBigInt: () => BigInt(1),
      toBn: () => new BN(1),
      toNumber: () => 1,
      unwrap: () => new BN(1)
    })).toEqual(true);
  });
});
