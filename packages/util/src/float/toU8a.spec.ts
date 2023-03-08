// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { u8aToHex } from '../u8a/index.js';
import { floatToU8a } from './index.js';

describe('floatToU8a', (): void => {
  it('throws on invalid bitLength', (): void => {
    expect(
      () => floatToU8a(123, { bitLength: 48 as 32 })
    ).toThrow();
  });

  describe('32-bit', (): void => {
    it('correctly encodes +0.0', (): void => {
      expect(
        u8aToHex(floatToU8a(+0.0))
      ).toEqual('0x00000000');
    });

    it('correctly encodes -0.0', (): void => {
      expect(
        u8aToHex(floatToU8a(-0.0))
      ).toEqual('0x00000080');
    });

    it('correctly encodes -0.0 (BE)', (): void => {
      expect(
        u8aToHex(floatToU8a(-0.0, { isLe: false }))
      ).toEqual('0x80000000');
    });

    it('encodes NaN', (): void => {
      expect(
        u8aToHex(floatToU8a(Number.NaN, { isLe: true }))
      ).toEqual('0x0000c07f');
    });

    describe('equivalency', (): void => {
      it('encodes number 123.456', (): void => {
        expect(
          u8aToHex(floatToU8a(123.456))
        ).toEqual('0x79e9f642');
      });

      it('encodes string 123.456', (): void => {
        expect(
          u8aToHex(floatToU8a('123.456'))
        ).toEqual('0x79e9f642');
      });

      it('encodes Number 123.456', (): void => {
        class Test extends Number {
          foo = 'bar';
        }

        // https://www.h-schmidt.net/FloatConverter/IEEE754.html
        expect(
          u8aToHex(floatToU8a(new Test(123.456)))
        ).toEqual('0x79e9f642');
      });
    });
  });

  describe('64-bit', (): void => {
    it('correctly encodes +0.0', (): void => {
      expect(
        u8aToHex(floatToU8a(+0.0, { bitLength: 64 }))
      ).toEqual('0x0000000000000000');
    });

    it('correctly encodes -0.0', (): void => {
      expect(
        u8aToHex(floatToU8a(-0.0, { bitLength: 64, isLe: true }))
      ).toEqual('0x0000000000000080');
    });

    it('correctly encodes -0.0 (BE)', (): void => {
      expect(
        u8aToHex(floatToU8a(-0.0, { bitLength: 64, isLe: false }))
      ).toEqual('0x8000000000000000');
    });

    it('encodes NaN', (): void => {
      expect(
        u8aToHex(floatToU8a(Number.NaN, { bitLength: 64 }))
      ).toEqual('0x000000000000f87f');
    });
  });
});
