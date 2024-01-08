// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { hexToU8a } from './toU8aBuffer.js';

describe('hexToU8a', (): void => {
  it('returns an empty Uint8Array when null provided', (): void => {
    expect(
      hexToU8a(null)
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
});
