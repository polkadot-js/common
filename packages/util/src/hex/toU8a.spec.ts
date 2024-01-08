// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { perfCmp } from '../test/index.js';
import { hexToU8a } from './index.js';
import { hexToU8a as hexToU8aBuffer } from './toU8aBuffer.js';

let ptest = '0x';

for (let i = 0; i < 1_000_000; i++) {
  ptest += (i % 256).toString(16);
}

describe('hexToU8a', (): void => {
  it('returns an empty Uint8Array when null provided', (): void => {
    expect(
      hexToU8a(null)
    ).toHaveLength(0);
  });

  it('returns an empty Uint8Array when 0x provided', (): void => {
    expect(
      hexToU8a('0x')
    ).toHaveLength(0);
  });

  it('returns a Uint8Array with the correct values', (): void => {
    expect(
      hexToU8a('0x80000a')
    ).toEqual(
      new Uint8Array([128, 0, 10])
    );
  });

  it('returns a Uint8Array with the correct values (bitLength > provided)', (): void => {
    expect(
      hexToU8a('0x80000A', 64)
    ).toEqual(
      new Uint8Array([0, 0, 0, 0, 0, 128, 0, 10])
    );
  });

  it('returns a Uint8Array with the correct values (bitLength < provided)', (): void => {
    expect(
      hexToU8a('0x80000a', 16)
    ).toEqual(
      new Uint8Array([128, 0])
    );
  });

  it('converts a non-aligned string', (): void => {
    expect(
      hexToU8a('0x123')
    ).toEqual(new Uint8Array([0x12, 0x30]));
  });

  it('converts known bytes to their correct values', (): void => {
    expect(
      hexToU8a('0x68656c6c6f20776f726c64') // hello world (11 bytes, non-aligned)
    ).toEqual(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64]));
  });

  it('converts known bytes to their correct values (upper/lower)', (): void => {
    expect(
      hexToU8a('0x68656C6c6f20776F726c64') // hello world (11 bytes, non-aligned)
    ).toEqual(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64]));
  });

  perfCmp('hexToU8a', ['hexToU8aBuffer', 'hexToU8a'], 40, [[ptest]], (s: string, isSecond) =>
    isSecond
      ? hexToU8a(s)
      : hexToU8aBuffer(s)
  );
});
