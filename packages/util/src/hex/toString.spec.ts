// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { hexToString } from '.';

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
