// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isInstanceOf } from './index.js';

describe('isInstanceOf', (): void => {
  it('returns true on real instances', (): void => {
    expect(
      isInstanceOf(new Array(2), Array)
    ).toEqual(true);
  });

  it('returns true on real instances (inherited)', (): void => {
    class Test extends Array {
      // default
    }

    expect(
      isInstanceOf(new Test(2), Array)
    ).toEqual(true);
  });

  it('returns false on non-allocated instances', (): void => {
    expect(
      isInstanceOf([], Array)
    ).toEqual(true);
  });

  it('returns false on non-instances', (): void => {
    expect(
      isInstanceOf('array', Array)
    ).toEqual(false);
  });

  it('returns false when class not specified', (): void => {
    expect(
      isInstanceOf('array', Array)
    ).toEqual(false);
  });

  it('returns false on wrong class type', (): void => {
    expect(
      isInstanceOf(new Array(2), String)
    ).toEqual(false);
  });
});
