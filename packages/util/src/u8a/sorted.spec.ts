// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { u8aSorted } from './index.js';

describe('u8aSorted', (): void => {
  it('sorts a simple set of u8a', (): void => {
    expect(
      u8aSorted([new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6]), new Uint8Array([2, 3, 4])])
    ).toEqual([new Uint8Array([1, 2, 3]), new Uint8Array([2, 3, 4]), new Uint8Array([4, 5, 6])]);
  });

  it('sorts a simple set of u8a (not the same lengths)', (): void => {
    expect(
      u8aSorted([new Uint8Array([1, 2, 3, 4]), new Uint8Array([4, 5, 6]), new Uint8Array([1, 2, 3, 5])])
    ).toEqual([new Uint8Array([1, 2, 3, 4]), new Uint8Array([1, 2, 3, 5]), new Uint8Array([4, 5, 6])]);
  });
});
