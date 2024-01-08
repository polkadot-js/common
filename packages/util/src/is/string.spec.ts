// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isString } from './index.js';

describe('isString', (): void => {
  it('returns true on valid strings', (): void => {
    expect(
      isString('123')
    ).toEqual(true);
  });

  it('returns true on empty strings', (): void => {
    expect(
      isString('')
    ).toEqual(true);
  });

  it('returns true on String object', (): void => {
    expect(
      isString(String('foo'))
    ).toEqual(true);
  });

  it('returns false on invalid numbers', (): void => {
    expect(
      isString(2)
    ).toEqual(false);
  });
});
