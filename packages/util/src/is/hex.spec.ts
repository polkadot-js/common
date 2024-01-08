// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { perf } from '../test/index.js';
import { isHex } from './index.js';

describe('isHex', (): void => {
  const test = '1234abcd';
  const ptest = `0x${'1234567890abcdef'.repeat(8192)}`;

  it('returns true on 0x hex values', (): void => {
    expect(
      isHex('0x')
    ).toEqual(true);
  });

  it('returns true on hex values', (): void => {
    expect(
      isHex(`0x${test}`)
    ).toEqual(true);
  });

  it('returns true on hex values with String', (): void => {
    expect(
      isHex(String(`0x${test}`))
    ).toEqual(true);
  });

  it('returns false on hex values (non % 2)', (): void => {
    expect(
      isHex(`0x${test}0`)
    ).toEqual(false);
  });

  it('returns true on uppercase values', (): void => {
    expect(
      isHex(`0x${test.toUpperCase()}`)
    ).toEqual(true);
  });

  it('return false on hex values unprefixed', (): void => {
    expect(
      isHex(test)
    ).toEqual(false);
  });

  it('returns false on non-string values', (): void => {
    expect(
      isHex(false)
    ).toEqual(false);
  });

  it('returns true when valid hex and bitLength matches', (): void => {
    expect(
      isHex('0x1234', 16)
    ).toEqual(true);
  });

  it('returns true when valid hex and bitLength does not match', (): void => {
    expect(
      isHex('0x1234', 8)
    ).toEqual(false);
  });

  it('does ignore lengths as required', (): void => {
    expect(
      isHex('0x123')
    ).toEqual(false);
    expect(
      isHex('0x123', -1, true)
    ).toEqual(true);
  });

  perf(`isHex (${(ptest.length - 2) / 2} bytes)`, 1000, [[ptest]], isHex);
});
