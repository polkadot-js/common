// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aToString } from '..';

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

  it('decodes the buffer correctly', (): void => {
    expect(
      u8aToString(
        new Uint8Array([208, 159, 209, 128, 208, 184, 208, 178, 208, 181, 209, 130, 44, 32, 208, 188, 208, 184, 209, 128, 33])
      )
    ).toEqual('Привет, мир!');
  });
});
