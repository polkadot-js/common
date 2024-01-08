// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { bufferToU8a } from './index.js';

describe('bufferToU8a', (): void => {
  it('returns an empty buffer when null provided', (): void => {
    expect(
      bufferToU8a(null)
    ).toEqual(new Uint8Array());
  });

  it('returns a Uint8Buffer with the correct values', (): void => {
    expect(
      bufferToU8a(Buffer.from([128, 0, 10]))
    ).toEqual(new Uint8Array([128, 0, 10]));
  });
});
