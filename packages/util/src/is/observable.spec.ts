// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isObservable } from './index.js';

describe('isObservable', (): void => {
  it('returns true on valid observables', (): void => {
    expect(
      isObservable({ next: (): boolean => true })
    ).toEqual(true);
  });

  it('returns false on invalid objects', (): void => {
    expect(
      isObservable('notAnObservable')
    ).toEqual(false);
  });

  it('returns false on invalid next functions', (): void => {
    expect(
      isObservable({ next: true })
    ).toEqual(false);
  });
});
