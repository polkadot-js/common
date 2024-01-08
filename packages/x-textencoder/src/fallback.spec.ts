// Copyright 2017-2024 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { TextEncoder } from './fallback.js';

describe('TextEncoder (fallback)', (): void => {
  it('encodes correctly', (): void => {
    expect(
      new TextEncoder().encode('abc')
    ).toEqual(new Uint8Array([97, 98, 99]));
  });
});
