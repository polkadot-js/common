// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { u8aToHex } from '../u8a/index.js';
import { floatToU8a } from './index.js';

class ExtNumber extends Number {
  foo = 'bar';
}

class ExtString extends String {
  foo = 'bar';
}

// NOTE Hex value outputs created via online conversion tool:
// https://www.h-schmidt.net/FloatConverter/IEEE754.html
// eslint-disable-next-line @typescript-eslint/ban-types
const TESTS: [isLe: boolean | undefined, bitLength: 32 | 64 | undefined, input: String | string | number | Number, output: string][] = [
  [undefined, undefined, +0.0, '0x00000000'],
  [undefined, undefined, -0.0, '0x00000080'],
  [undefined, undefined, 123.456, '0x79e9f642'],
  [undefined, undefined, '123.456', '0x79e9f642'],
  [undefined, undefined, new ExtNumber(123.456), '0x79e9f642'],
  [undefined, undefined, new ExtString(123.456), '0x79e9f642'],
  [true, 32, new ExtString(123.456), '0x79e9f642'],
  [true, undefined, Number.NaN, '0x0000c07f'],
  [false, undefined, -0.0, '0x80000000'],
  [undefined, 64, +0.0, '0x0000000000000000'],
  [true, 64, -0.0, '0x0000000000000080'],
  [false, 64, -0.0, '0x8000000000000000'],
  [undefined, 64, Number.NaN, '0x000000000000f87f']
];

describe('floatToU8a', (): void => {
  it('throws on invalid bitLength', (): void => {
    expect(
      () => floatToU8a(123, { bitLength: 48 as 32 })
    ).toThrow();
  });

  describe('conversion tests', (): void => {
    TESTS.forEach(([isLe, bitLength, input, output], i): void => {
      it(`#${i}: correctly encodes ${typeof input === 'number' ? input : input.toString()} (typeof=${typeof input})`, (): void => {
        expect(
          u8aToHex(floatToU8a(input, { bitLength, isLe }))
        ).toEqual(output);
      });
    });
  });
});
