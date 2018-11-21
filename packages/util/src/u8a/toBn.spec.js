// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aToBn } from './index';

describe('u8aToBn', () => {
  it('converts values (big-endian)', () => {
    expect(
      u8aToBn(
        new Uint8Array([0x12, 0x34]),
        false
      ).toString(16)
    ).toEqual('1234');
  });

  it('converts values (little-endian)', () => {
    expect(
      u8aToBn(
        new Uint8Array([0x12, 0x34]),
        true
      ).toString(16)
    ).toEqual('3412');
  });

  it('converts empty', () => {
    expect(
      u8aToBn(
        new Uint8Array([]),
        true
      ).toString(16)
    ).toEqual('0');
  });

  it('handled overflows correctly (little-endian)', () => {
    expect(
      u8aToBn(
        new Uint8Array([ 0, 1, 0, 0, 0, 0, 0, 0 ]),
        true
      ).toString()
    ).toEqual('256');
  });
});
