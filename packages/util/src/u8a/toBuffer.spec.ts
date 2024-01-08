// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { u8aToBuffer } from './index.js';

describe('u8aToBuffer', (): void => {
  it('returns [] when the buffer is null', (): void => {
    expect(
      u8aToBuffer(null)
    ).toEqual(Buffer.from([]));
  });

  it('returns the Buffer value for the Uint8Array', (): void => {
    expect(
      u8aToBuffer(new Uint8Array([128, 0, 10]))
    ).toEqual(Buffer.from([128, 0, 10]));
  });
});
