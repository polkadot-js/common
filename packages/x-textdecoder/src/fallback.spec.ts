// Copyright 2017-2024 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { TextDecoder } from './fallback.js';

describe('TextDecoder (fallback)', (): void => {
  it('decodes correctly', (): void => {
    expect(
      new TextDecoder().decode(new Uint8Array([97, 98, 99]))
    ).toEqual('abc');
  });

  it('decodes correctly (with constructor param)', (): void => {
    expect(
      new TextDecoder('utf-8').decode(new Uint8Array([97, 98, 99, 98, 97]))
    ).toEqual('abcba');
  });
});
