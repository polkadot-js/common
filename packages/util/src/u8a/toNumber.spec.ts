// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { perf } from '../test/index.js';
import { u8aToNumber } from './index.js';
import { TESTS } from './toBn.spec.js';

const TESTS_NUM = TESTS.filter(([isLe,, numarr]) =>
  isLe === true &&
  numarr.length <= 6
);

describe('u8aToNumber', (): void => {
  describe('conversion tests', (): void => {
    for (let i = 0, count = TESTS_NUM.length; i < count; i++) {
      const [, isNegative, numarr, strval] = TESTS_NUM[i];

      it(`${i}: creates ${strval} (bitLength=${numarr.length * 8}, isNegative=${isNegative})`, (): void => {
        expect(
          u8aToNumber(
            new Uint8Array(numarr),
            { isNegative }
          ).toString()
        ).toBe(strval);
      });
    }
  });

  describe('empty creation', (): void => {
    it('handles unsigned (le)', (): void => {
      expect(
        u8aToNumber(
          new Uint8Array()
        )
      ).toBe(0);
    });

    it('handles signed (le)', (): void => {
      expect(
        u8aToNumber(
          new Uint8Array(),
          { isNegative: true }
        )
      ).toBe(0);
    });
  });

  perf('u8aToNumber (i32)', 750_000, [[new Uint8Array([0x9c, 0x9c, 0x9c, 0x9c])]], (v: Uint8Array) => u8aToNumber(v, { isNegative: true }));
  perf('u8aToNumber (u32)', 750_000, [[new Uint8Array([0x68, 0x65, 0x6c, 0x6c])]], u8aToNumber);
});
