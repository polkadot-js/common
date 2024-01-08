// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isObject } from './index.js';

describe('isObject', (): void => {
  it('returns true on valid objects', (): void => {
    expect(
      isObject({})
    ).toEqual(true);
  });

  it('returns false on invalid objects', (): void => {
    expect(
      isObject('notAnObject')
    ).toEqual(false);
  });

  it('returns false on null', (): void => {
    expect(
      isObject(null)
    ).toEqual(false);
  });

  it('returns false on bigint', (): void => {
    expect(
      isObject(123n)
    ).toEqual(false);
  });
});
