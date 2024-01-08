// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isBuffer } from './index.js';

describe('isBuffer', (): void => {
  it('returns true when a Buffer value', (): void => {
    expect(
      isBuffer(Buffer.from([]))
    ).toEqual(true);
  });

  it('returns false on non-Buffer values (number)', (): void => {
    expect(
      isBuffer(123)
    ).toEqual(false);
  });

  it('returns false on non-Buffer values (null)', (): void => {
    expect(
      isBuffer(null)
    ).toEqual(false);
  });
});
