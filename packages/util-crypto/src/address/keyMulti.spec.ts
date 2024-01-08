// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { createKeyMulti } from './index.js';

describe('createKeyMulti', (): void => {
  it('creates a valid multikey (aligning with Rust, needs sorting)', (): void => {
    expect(
      createKeyMulti([
        new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0]),
        new Uint8Array([3, 0, 0, 0, 0, 0, 0, 0]),
        new Uint8Array([2, 0, 0, 0, 0, 0, 0, 0])
      ], 2)
    ).toEqual(
      new Uint8Array([67, 151, 196, 155, 179, 207, 47, 123, 90, 2, 35, 54, 162, 111, 241, 226, 88, 148, 54, 193, 252, 195, 93, 101, 16, 5, 93, 101, 186, 186, 254, 79])
    );
  });
});
