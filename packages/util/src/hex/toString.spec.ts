// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { hexToString } from './index.js';

describe('hexToString', (): void => {
  it('converts an empty to ""', (): void => {
    expect(
      hexToString()
    ).toEqual('');
  });

  it('converts to a string from hex', (): void => {
    expect(
      hexToString('0x68656c6c6f')
    ).toEqual('hello');
  });
});
