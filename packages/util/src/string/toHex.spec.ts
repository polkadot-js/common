// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { stringToHex } from './index.js';

describe('hexToString', (): void => {
  it('converts an empty to ""', (): void => {
    expect(
      stringToHex()
    ).toEqual('0x');
  });

  it('converts to a hex from string', (): void => {
    expect(
      stringToHex('hello')
    ).toEqual('0x68656c6c6f');
  });

  it('converts to a hex from String', (): void => {
    expect(
      stringToHex(String('hello'))
    ).toEqual('0x68656c6c6f');
  });
});
