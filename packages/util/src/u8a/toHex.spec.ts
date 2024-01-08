// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { perfCmp } from '../test/index.js';
import { u8aToHex } from './index.js';
import { u8aToHex as u8aToHexBuffer } from './toHexBuffer.js';

const ptest32k = new Uint8Array(32768);
const ptest256 = new Uint8Array(256);

for (let i = 0, count = ptest32k.length; i < count; i++) {
  if (i < ptest256.length) {
    ptest256[1] = i % 256;
  }

  ptest32k[i] = i % 256;
}

describe('u8aToHex', (): void => {
  it('returns empty as 0x', (): void => {
    expect(
      u8aToHex()
    ).toEqual('0x');
  });

  it('returns empty as "" (unprefixed)', (): void => {
    expect(
      u8aToHex(null, -1, false)
    ).toEqual('');
  });

  it('returns the hex value for the array', (): void => {
    expect(
      u8aToHex(
        new Uint8Array([128, 0, 10])
      )
    ).toEqual('0x80000a');
  });

  it('returns the hex value for the array (unprefixed)', (): void => {
    expect(
      u8aToHex(
        new Uint8Array([128, 0, 10]),
        -1,
        false
      )
    ).toEqual('80000a');
  });

  it('handles starting zeros correctly', (): void => {
    expect(
      u8aToHex(
        new Uint8Array([0, 1, 0, 0, 0, 0, 0, 0])
      )
    ).toEqual('0x0001000000000000');
  });

  it('returns the hex value where allowed < max', (): void => {
    expect(
      u8aToHex(
        new Uint8Array(Uint8Array.from([128, 0, 10, 11]), 64)
      )
    ).toEqual('0x80000a0b');
  });

  it('returns the trimmed hex value where allowed >= max', (): void => {
    expect(
      u8aToHex(
        new Uint8Array([128, 0, 10, 11, 12, 13]),
        32
      )
    ).toEqual('0x8000…0c0d');
  });

  it('converts known bytes to their correct values', (): void => {
    expect(
      // hello world
      u8aToHex(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64]))
    ).toEqual('0x68656c6c6f20776f726c64');
  });

  perfCmp('u8aToHex (32k)', ['u8aToHexBuffer', 'u8aToHex'], 1000, [[ptest32k]], (s: Uint8Array, isSecond) =>
    isSecond
      ? u8aToHex(s)
      : u8aToHexBuffer(s)
  );
  perfCmp('u8aToHex (128)', ['u8aToHexBuffer', 'u8aToHex'], 200_000, [[ptest256]], (s: Uint8Array, isSecond) =>
    isSecond
      ? u8aToHex(s)
      : u8aToHexBuffer(s)
  );
});
