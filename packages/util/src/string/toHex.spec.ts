// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { stringToHex } from '.';

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
});
