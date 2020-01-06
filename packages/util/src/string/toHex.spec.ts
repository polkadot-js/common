// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

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
