// Copyright 2017-2023 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { TextEncoder } from './fallback.js';

describe('TextEncoder (fallback)', (): void => {
  it('encodes correctly', (): void => {
    expect(
      new TextEncoder().encode('abc')
    ).toEqual(new Uint8Array([97, 98, 99]));
  });
});
