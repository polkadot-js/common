// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isPromise } from './index.js';

describe('isPromise', (): void => {
  it('returns true on valid Promise (Promise-like)', (): void => {
    expect(
      isPromise(Promise.resolve(1))
    ).toEqual(true);
    expect(
      isPromise({ catch: () => null, then: () => null })
    ).toEqual(true);
  });

  it('returns false on invalid objects', (): void => {
    expect(
      isPromise('notAnObservable')
    ).toEqual(false);
  });

  it('returns false on invalid catch/then functions', (): void => {
    expect(
      isPromise({ catch: () => null, then: true })
    ).toEqual(false);
    expect(
      isPromise({ catch: true, then: () => null })
    ).toEqual(false);
  });
});
