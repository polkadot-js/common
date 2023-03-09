// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { perf } from '../test/index.js';
import { u8aToU8a } from './index.js';

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

  it('returns a Uint8Array (hex input)', (): void => {
    expect(
      u8aToU8a('0x80000a')
    ).toEqual(
      new Uint8Array([128, 0, 10])
    );
  });

  it('returns Uint8Array (string input)', (): void => {
    expect(
      u8aToU8a('abcde fghij')
    ).toEqual(new Uint8Array([97, 98, 99, 100, 101, 32, 102, 103, 104, 105, 106]));
  });

  it('creates from Array', (): void => {
    expect(
      u8aToU8a([128, 0, 10, 11, 12])
    ).toEqual(
      new Uint8Array([128, 0, 10, 11, 12])
    );
  });

  it('creates from a Buffer', (): void => {
    expect(
      u8aToU8a(Buffer.from([1, 2, 3, 128, 0, 10, 11, 12])).buffer
    ).toEqual(
      new Uint8Array([1, 2, 3, 128, 0, 10, 11, 12]).buffer
    );
  });

  it('creates from a Buffer (hex)', (): void => {
    expect(
      u8aToU8a(Buffer.from('80000a', 'hex')).buffer
    ).toEqual(
      new Uint8Array([128, 0, 10]).buffer
    );
  });

  it('returns a Uint8Array as-is (u8a input)', (): void => {
    const input = new Uint8Array([128, 0, 10]);

    expect(
      u8aToU8a(input) === input
    ).toEqual(true);
  });

  it('creates unknowns via string conversion', (): void => {
    expect(
      // this is where completely invalid data is being passed
      u8aToU8a(123 as unknown as Uint8Array)
    ).toEqual(new Uint8Array([49, 50, 51]));
  });

  perf('u8aToU8a (hex)', 250_000, [['0x1234']], u8aToU8a);
  perf('u8aToU8a (str)', 250_000, [['test']], u8aToU8a);
  perf('u8aToU8a (u8a)', 1_000_000, [[new Uint8Array()]], u8aToU8a);
});
