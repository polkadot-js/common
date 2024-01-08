// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { hexStripPrefix } from './index.js';

describe('hexStripPrefix', (): void => {
  it('returns an empty string when null value supplied', (): void => {
    expect(
      hexStripPrefix(null)
    ).toEqual('');
  });

  it('returns an empty string when 0x value supplied', (): void => {
    expect(
      hexStripPrefix('0x')
    ).toEqual('');
  });

  it('strips the prefix from hex strings', (): void => {
    expect(
      hexStripPrefix('0x1223')
    ).toEqual('1223');
  });

  it('strips the prefix from hex strings (non 2 lnegth)', (): void => {
    expect(
      hexStripPrefix('0x123')
    ).toEqual('123');
  });

  it('returns un-prefixed hex as-is', (): void => {
    expect(
      hexStripPrefix('abcd1223')
    ).toEqual('abcd1223');
  });

  it('throws when invalid hex', (): void => {
    expect(
      () => hexStripPrefix('0x0x01ab')
    ).toThrow(/Expected hex value to convert/);
  });
});
