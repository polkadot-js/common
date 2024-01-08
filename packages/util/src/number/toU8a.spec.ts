// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { numberToU8a } from './index.js';

describe('numberToU8a', (): void => {
  it('converts undefined to empty', (): void => {
    expect(
      numberToU8a()
    ).toEqual(new Uint8Array(1));
  });

  it('converts null to empty', (): void => {
    expect(
      numberToU8a(null)
    ).toEqual(new Uint8Array(1));
  });

  it('converts NaN to empty', (): void => {
    expect(
      numberToU8a(NaN)
    ).toEqual(new Uint8Array(1));
  });

  it('converts 0 to u8a', (): void => {
    expect(
      numberToU8a(0)
    ).toEqual(new Uint8Array([0]));
  });

  it('converts 0 to u8a (with length)', (): void => {
    expect(
      numberToU8a(0, 16)
    ).toEqual(new Uint8Array([0, 0]));
  });

  it('converts values to the u8a', (): void => {
    expect(
      numberToU8a(0x3456)
    ).toEqual(new Uint8Array([0x34, 0x56]));
  });

  it('converts values to the u8a (bitLength)', (): void => {
    expect(
      numberToU8a(0x3456, 32)
    ).toEqual(new Uint8Array([0x00, 0x00, 0x34, 0x56]));
  });
});
