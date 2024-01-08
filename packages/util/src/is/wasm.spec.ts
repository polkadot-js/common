// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isWasm } from './index.js';

describe('isWasm', (): void => {
  it('is false on no value', (): void => {
    expect(isWasm()).toEqual(false);
  });

  it('is false on non-wasm header', (): void => {
    expect(isWasm(new Uint8Array([1, 2, 3]))).toEqual(false);
  });

  it('is true when a wasm header is found', (): void => {
    expect(isWasm(new Uint8Array([0, 97, 115, 109, 1, 2, 3]))).toEqual(true);
  });
});
