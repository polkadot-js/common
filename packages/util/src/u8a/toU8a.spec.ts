// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToU8a } from '.';

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
      u8aToU8a(Buffer.from([1, 2, 3, 128, 0, 10, 11, 12]))
    ).toEqual(
      new Uint8Array([1, 2, 3, 128, 0, 10, 11, 12])
    );
    expect(
      u8aToU8a(Buffer.from('80000a', 'hex'))
    ).toEqual(
      new Uint8Array([128, 0, 10])
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
});
