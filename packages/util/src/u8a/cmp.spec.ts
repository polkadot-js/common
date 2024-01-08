// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { perf } from '../test/index.js';
import { u8aCmp } from './index.js';

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

describe('u8aCmp', (): void => {
  it('has the same result as localCompare (equal length)', (): void => {
    const a = 'test abc';
    const b = 'test def';

    expect(
      u8aCmp(a, b)
    ).toEqual(a.localeCompare(b));
    expect(
      u8aCmp(b, a)
    ).toEqual(b.localeCompare(a));
  });

  it('has the same result as localCompare (diff length)', (): void => {
    const a = 'test';
    const b = 'test abc';

    expect(
      u8aCmp(a, b)
    ).toEqual(a.localeCompare(b));
    expect(
      u8aCmp(b, a)
    ).toEqual(b.localeCompare(a));
  });

  it('compares between string and Uint8Array', (): void => {
    expect(
      u8aCmp(
        '0x12345678',
        new Uint8Array([0x12, 0x34, 0x56, 0x78])
      )
    ).toEqual(0);
  });

  perf('u8aCmp (64 cmp)', 100_000, [[ztest, ztest]], u8aCmp);
  perf('u8aCmp (256 cmp)', 50_000, [[stest, stest]], u8aCmp);
  perf('u8aCmp (32k cmp)', 500, [[ltest, ltest]], u8aCmp);
});
