// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { hexFixLength } from './index.js';

describe('hexFixLength', (): void => {
  it('returns bitLength === -1 as-is', (): void => {
    expect(
      hexFixLength('0x12345678')
    ).toEqual('0x12345678');
  });

  it('does not change when bitlength === length', (): void => {
    expect(
      hexFixLength('0x12345678', 32)
    ).toEqual('0x12345678');
  });

  it('trims values when bitLength > length', (): void => {
    expect(
      hexFixLength('0x12345678', 16)
    ).toEqual('0x5678');
  });

  it('returns as-is when bitLength < length', (): void => {
    expect(
      hexFixLength('0x1234', 32)
    ).toEqual('0x1234');
  });

  it('adds zeros when bitLength < length (withPadded)', (): void => {
    expect(
      hexFixLength('0x1234', 32, true)
    ).toEqual('0x00001234');
  });
});
