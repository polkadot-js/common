// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import type { U8aLike } from '../types.js';

import { perf } from '../test/index.js';
import { u8aToU8a } from './index.js';

const TESTS: [input: U8aLike | null | undefined, output: Uint8Array][] = [
  ['0x80000a', new Uint8Array([128, 0, 10])],
  ['abcde fghij', new Uint8Array([97, 98, 99, 100, 101, 32, 102, 103, 104, 105, 106])],
  [[128, 0, 10, 11, 12], new Uint8Array([128, 0, 10, 11, 12])],
  [Buffer.from([1, 2, 3, 128, 0, 10, 11, 12]), new Uint8Array([1, 2, 3, 128, 0, 10, 11, 12])],
  [Buffer.from('80000a', 'hex'), new Uint8Array([128, 0, 10])],
  // this is where completely invalid data is being passed
  [123 as unknown as Uint8Array, new Uint8Array([49, 50, 51])]
];

describe('u8aToU8a', (): void => {
  it('returns an empty Uint8Array when null/undefined/"" provided', (): void => {
    expect(
      u8aToU8a(null)
    ).toHaveLength(0);
    expect(
      u8aToU8a()
    ).toHaveLength(0);
    expect(
      u8aToU8a('')
    ).toHaveLength(0);
  });

  it('returns a Uint8Array as-is (u8a input)', (): void => {
    const input = new Uint8Array([128, 0, 10]);

    expect(
      u8aToU8a(input) === input
    ).toEqual(true);
  });

  describe('conversion tests', (): void => {
    TESTS.forEach(([input, output], i): void => {
      it(`#${i}: converts ${input as string} (typeof=${typeof input})`, (): void => {
        expect(
          u8aToU8a(input)
        ).toEqual(
          output
        );
      });
    });
  });

  perf('u8aToU8a (hex)', 250_000, [['0x1234']], u8aToU8a);
  perf('u8aToU8a (str)', 250_000, [['test']], u8aToU8a);
  perf('u8aToU8a (u8a)', 1_000_000, [[new Uint8Array()]], u8aToU8a);
});
