// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { u8aFixLength } from './index.js';

describe('u8aFixLength', (): void => {
  it('returns bitLength === -1 as-is', (): void => {
    expect(
      u8aFixLength(
        new Uint8Array([0x12, 0x34, 0x56, 0x78])
      )
    ).toEqual(new Uint8Array([0x12, 0x34, 0x56, 0x78]));
  });

  it('does not change when bitlength === length', (): void => {
    expect(
      u8aFixLength(new Uint8Array([0x12, 0x34, 0x56, 0x78]), 32)
    ).toEqual(new Uint8Array([0x12, 0x34, 0x56, 0x78]));
  });

  it('trims values when bitLength > length', (): void => {
    expect(
      u8aFixLength(new Uint8Array([0x12, 0x34, 0x56, 0x78]), 16)
    ).toEqual(new Uint8Array([0x12, 0x34]));
  });

  it('adds zeros when bitLength < length (withPadded)', (): void => {
    expect(
      u8aFixLength(new Uint8Array([0x12, 0x34]), 32)
    ).toEqual(new Uint8Array([0, 0, 0x12, 0x34]));
  });
});
