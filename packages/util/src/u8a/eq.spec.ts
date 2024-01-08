// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { perf } from '../test/index.js';
import { u8aEq } from './index.js';

const ltest = new Uint8Array(32768);
const stest = new Uint8Array(256);
const ztest = new Uint8Array(64);

for (let i = 0, count = ltest.length; i < count; i++) {
  if (i < ztest.length) {
    ztest[i] = i % 256;
  }

  if (i < stest.length) {
    stest[i] = i % 256;
  }

  ltest[i] = i % 256;
}

describe('u8aEq', (): void => {
  it('returns false when the lengths do not match', (): void => {
    expect(
      u8aEq(
        new Uint8Array([1, 2, 3]),
        new Uint8Array([1, 2])
      )
    ).toEqual(false);
  });

  it('returns false when the contents do not match', (): void => {
    expect(
      u8aEq(
        new Uint8Array([1, 2, 3]),
        new Uint8Array([1, 2, 4])
      )
    ).toEqual(false);
  });

  it('returns true when the contents do match', (): void => {
    expect(
      u8aEq(
        new Uint8Array([1, 2, 3]),
        new Uint8Array([1, 2, 3])
      )
    ).toEqual(true);
  });

  it('returns false when the contents do not match (with u32 start)', (): void => {
    expect(
      u8aEq(
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3]),
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 4])
      )
    ).toEqual(false);
  });

  it('returns true when the contents do match (with u32 start)', (): void => {
    expect(
      u8aEq(
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3]),
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3])
      )
    ).toEqual(true);
  });

  it('returns false when the contents do not match (u32 only)', (): void => {
    expect(
      u8aEq(
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]),
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 9])
      )
    ).toEqual(false);
  });

  it('returns true when the contents do match (u32 only)', (): void => {
    expect(
      u8aEq(
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]),
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8])
      )
    ).toEqual(true);
  });

  it('returns true with equalvalent hex & Uint8array', (): void => {
    expect(
      u8aEq(
        '0x010203',
        new Uint8Array([1, 2, 3])
      )
    ).toEqual(true);
  });

  it('works on aubarray values', (): void => {
    const a = new Uint8Array(16);

    for (let i = 0, count = a.length; i < count; i++) {
      a[i] = i;
    }

    expect(
      u8aEq(a.subarray(0, 5), a.subarray(0, 5))
    ).toEqual(true);
  });

  perf('u8aEq (64 cmp)', 200_000, [[ztest, ztest]], u8aEq);
  perf('u8aEq (256 cmp)', 200_000, [[stest, stest]], u8aEq);
  perf('u8aEq (32k cmp)', 10_000, [[ltest, ltest]], u8aEq);
});
