// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';

import { isChildClass } from '.';

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

    if (isChildClass(BN, T)) {
      expect(new T(12345).toNumber()).toEqual(12345);
    } else {
      throw new Error('Not a child class');
    }
  });
});
