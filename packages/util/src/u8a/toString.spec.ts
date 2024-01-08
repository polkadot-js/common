// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { u8aToString } from './index.js';

describe('u8aToString', (): void => {
  it('decodes to an empty string for undefined', (): void => {
    expect(
      u8aToString()
    ).toEqual('');
  });

  it('decodes to an empty string for empty buffer', (): void => {
    expect(
      u8aToString(new Uint8Array())
    ).toEqual('');
  });

  it('decodes the Uint8Array correctly (ru)', (): void => {
    expect(
      u8aToString(
        new Uint8Array([208, 159, 209, 128, 208, 184, 208, 178, 208, 181, 209, 130, 44, 32, 208, 188, 208, 184, 209, 128, 33])
      )
    ).toEqual('Привет, мир!');
  });

  it('decodes the Uint8Array correctly (en)', (): void => {
    expect(
      u8aToString(
        new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64])
      )
    ).toEqual('hello world');
  });
});
