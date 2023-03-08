// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { perf } from '../test/index.js';
import { u8aToBigInt } from './index.js';

describe('u8aToBigInt', (): void => {
  it('converts little-endian by default', (): void => {
    expect(
      u8aToBigInt(
        new Uint8Array([0x12, 0x34])
      )
    ).toEqual(0x3412n);
  });

  it('converts values (big-endian)', (): void => {
    expect(
      u8aToBigInt(
        new Uint8Array([0x12, 0x34]),
        { isLe: false }
      )
    ).toEqual(0x1234n);
  });

  it('converts values (little-endian)', (): void => {
    expect(
      u8aToBigInt(
        new Uint8Array([0x12, 0x34, 0x56]),
        { isLe: true }
      )
    ).toEqual(0x563412n);
  });

  it('converts empty', (): void => {
    expect(
      u8aToBigInt(
        new Uint8Array(),
        { isLe: true }
      )
    ).toEqual(0n);
  });

  it('handles negative numbers (little-endian)', (): void => {
    expect(
      u8aToBigInt(
        new Uint8Array([192, 29, 254]),
        { isLe: true, isNegative: true }
      )
    ).toEqual(-123456n);
  });

  it('handles negative numbers (big-endian)', (): void => {
    expect(
      u8aToBigInt(
        new Uint8Array([251, 46]),
        { isLe: false, isNegative: true }
      )
    ).toEqual(-1234n);
  });

  perf('u8aToBigInt', 500000, [[new Uint8Array([0x68, 0x65, 0x6c, 0x6c])]], u8aToBigInt);
});
