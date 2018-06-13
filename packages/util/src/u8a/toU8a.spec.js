// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { u8aToU8a } = require('./index');

describe('u8aToU8a', () => {
  it('returns an empty Uint8Array when null provided', () => {
    expect(
      u8aToU8a(null)
    ).toHaveLength(0);
  });

  it('returns a Uint8Array with the correct values (hex)', () => {
    expect(
      u8aToU8a('0x80000a')
    ).toEqual(
      new Uint8Array([128, 0, 10])
    );
  });

  it('returns a Uint8Array with the correct values (u8a)', () => {
    expect(
      u8aToU8a(new Uint8Array([128, 0, 10]))
    ).toEqual(
      new Uint8Array([128, 0, 10])
    );
  });
});
