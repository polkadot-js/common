// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { u8aToUtf8 } = require('./index');

describe('u8aToUtf8', () => {
  it('decodes to an empty string for undefined', () => {
    expect(
      u8aToUtf8()
    ).toEqual('');
  });

  it('decodes to an empty string for empty buffer', () => {
    expect(
      u8aToUtf8(new Uint8Array([]))
    ).toEqual('');
  });

  it('decodes the buffer correctly', () => {
    expect(
      u8aToUtf8(
        new Uint8Array([208, 159, 209, 128, 208, 184, 208, 178, 208, 181, 209, 130, 44, 32, 208, 188, 208, 184, 209, 128, 33])
      )
    ).toEqual('Привет, мир!');
  });
});
