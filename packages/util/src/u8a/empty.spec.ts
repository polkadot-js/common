// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { perf } from '../test/index.js';
import { u8aEmpty } from './index.js';

describe('u8aEmpty', (): void => {
  it('returns true on zero length', (): void => {
    expect(
      u8aEmpty(new Uint8Array())
    ).toEqual(true);
  });

  it('returns true on all zero values', (): void => {
    expect(
      u8aEmpty(new Uint8Array([0, 0, 0, 0, 0, 0]))
    ).toEqual(true);
  });

  it('returns false when value is found', (): void => {
    expect(
      u8aEmpty(new Uint8Array([0, 0, 0, 0, 0, 1]))
    ).toEqual(false);
  });

  it('returns false when value is found (256)', (): void => {
    const test = new Uint8Array(256);

    expect(
      u8aEmpty(test)
    ).toEqual(true);

    test[128] = 1;

    expect(
      u8aEmpty(test)
    ).toEqual(false);
  });

  perf('u8aEmpty (32 cmp)', 1_000_000, [[new Uint8Array(32)]], u8aEmpty);
  perf('u8aEmpty (64 cmp)', 500_000, [[new Uint8Array(64)]], u8aEmpty);
  perf('u8aEmpty (128 cmp)', 250_000, [[new Uint8Array(128)]], u8aEmpty);
  perf('u8aEmpty (256 cmp)', 125_000, [[new Uint8Array(256)]], u8aEmpty);
});
