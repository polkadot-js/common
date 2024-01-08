// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { BN } from '../bn/index.js';
import { isChildClass } from './index.js';

describe('isChildClass', (): void => {
  it('returns true when a Child value', (): void => {
    expect(
      isChildClass(BN, class Test extends BN {})
    ).toEqual(true);
  });

  it('returns false on non-Child values', (): void => {
    expect(
      isChildClass(BN, Uint8Array)
    ).toEqual(false);
  });

  it('returns false on undefined', (): void => {
    expect(
      isChildClass(BN)
    ).toEqual(false);
  });

  it('does TS magic, determining type', (): void => {
    const T = (class extends BN {}) as unknown;

    expect(
      isChildClass(BN, T) &&
      new T(12345).toNumber()
    ).toEqual(12345);
  });
});
