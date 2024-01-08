// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { numberToHex } from './index.js';

describe('numberToHex', (): void => {
  it('converts undefined to 0x00', (): void => {
    expect(
      numberToHex()
    ).toEqual('0x00');
  });

  it('converts null to 0x00000000 (with bitLength)', (): void => {
    expect(
      numberToHex(null, 32)
    ).toEqual('0x00000000');
  });

  it('converts Nan to 0x', (): void => {
    expect(
      numberToHex(NaN)
    ).toEqual('0x00');
  });

  it('converts 0 to 0x00', (): void => {
    expect(
      numberToHex(0)
    ).toEqual('0x00');
  });

  it('converts number to hex', (): void => {
    expect(
      numberToHex(0x1245)
    ).toEqual('0x1245');
  });

  it('converts number to hex (specfified bitLength)', (): void => {
    expect(
      numberToHex(0x1245, 32)
    ).toEqual('0x00001245');
  });
});
