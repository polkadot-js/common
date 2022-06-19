// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToHex } from '../u8a';
import { floatToU8a } from '.';

describe('floatToU8a', (): void => {
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
