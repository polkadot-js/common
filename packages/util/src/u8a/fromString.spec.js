// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { u8aFromString } from './index';

describe('u8aFromString', () => {
  it('encodes a string byte for byte', () => {
    expect(
      u8aFromString('12345678901234567890123456789012')
    ).toEqual(
      new Uint8Array([
        0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38,
        0x39, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36,
        0x37, 0x38, 0x39, 0x30, 0x31, 0x32, 0x33, 0x34,
        0x35, 0x36, 0x37, 0x38, 0x39, 0x30, 0x31, 0x32
      ])
    );
  });
});
