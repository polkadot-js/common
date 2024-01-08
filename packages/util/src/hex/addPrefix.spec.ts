// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { hexAddPrefix } from './index.js';

describe('hexAddPrefix', (): void => {
  it('does not add when prefix is available', (): void => {
    expect(
      hexAddPrefix('0x0123')
    ).toEqual('0x0123');
  });

  it('adds the prefix when it is not available', (): void => {
    expect(
      hexAddPrefix('0123')
    ).toEqual('0x0123');
  });

  it('adds extra 0 when length % 2 === 1', (): void => {
    expect(
      hexAddPrefix('123')
    ).toEqual('0x0123');
  });

  it('returns null as 0x', (): void => {
    expect(
      hexAddPrefix(null)
    ).toEqual('0x');
  });
});
