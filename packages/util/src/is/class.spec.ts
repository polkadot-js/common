// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { BN } from '../bn/index.js';
import { isClass } from './index.js';

describe('isClass', (): void => {
  it('returns false on a pure object', (): void => {
    expect(isClass({})).toEqual(false);
  });

  it('returns false on instance values', (): void => {
    expect(
      isClass(new BN(1))
    ).toEqual(false);
  });

  it('returns true when a class value', (): void => {
    expect(
      isClass(BN)
    ).toEqual(true);
  });

  it('returns true on extends', (): void => {
    expect(
      isClass(class Test extends BN {})
    ).toEqual(true);
  });

  it('returns true on built-ins', (): void => {
    expect(
      isClass(Uint8Array)
    ).toEqual(true);
  });
});
