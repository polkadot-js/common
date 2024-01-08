// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { hexToU8a } from '../hex/index.js';
import { u8aToFloat } from './index.js';

describe('u8aToFloat', (): void => {
  it('throws on invalid bitLength', (): void => {
    expect(
      () => u8aToFloat(hexToU8a('0x00000000'), { bitLength: 48 as 32 })
    ).toThrow();
  });

  it('throws on invalid input length', (): void => {
    expect(
      () => u8aToFloat(new Uint8Array())
    ).toThrow();
  });

  describe('32-bit', (): void => {
    it('correctly decodes +0.0', (): void => {
      expect(
        u8aToFloat(hexToU8a('0x00000000'))
      ).toEqual(+0.0);
    });

    it('correctly decodes -0.0', (): void => {
      expect(
        u8aToFloat(hexToU8a('0x00000080'))
      ).toEqual(-0.0);
    });

    it('correctly decodes -0.0 (BE)', (): void => {
      expect(
        u8aToFloat(hexToU8a('0x80000000'), { isLe: false })
      ).toEqual(-0.0);
    });

    it('decoded NaN', (): void => {
      expect(
        u8aToFloat(hexToU8a('0x0000c07f'))
      ).toEqual(Number.NaN);
    });

    // https://www.h-schmidt.net/FloatConverter/IEEE754.html
    it('decodes a known number', (): void => {
      expect(
        u8aToFloat(hexToU8a('0x79e9f642')).toFixed(3)
      ).toEqual('123.456');
    });

    it('decodes a known number (BE)', (): void => {
      expect(
        u8aToFloat(hexToU8a('0x42f6e979'), { isLe: false }).toFixed(3)
      ).toEqual('123.456');
    });
  });

  describe('64-bit', (): void => {
    it('correctly decodes +0.0', (): void => {
      expect(
        u8aToFloat(hexToU8a('0x0000000000000000'), { bitLength: 64 })
      ).toEqual(+0.0);
    });

    it('correctly decodes -0.0', (): void => {
      expect(
        u8aToFloat(hexToU8a('0x0000000000000080'), { bitLength: 64 })
      ).toEqual(-0.0);
    });

    it('correctly decodes -0.0 (BE)', (): void => {
      expect(
        u8aToFloat(hexToU8a('0x8000000000000000'), { bitLength: 64, isLe: false })
      ).toEqual(-0.0);
    });

    it('correctly decodes NaN', (): void => {
      expect(
        u8aToFloat(hexToU8a('0x000000000000f87f'), { bitLength: 64 })
      ).toEqual(Number.NaN);
    });
  });
});
