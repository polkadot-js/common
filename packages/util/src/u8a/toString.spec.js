// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { u8aToString } = require('./index');

describe('u8aToString', () => {
  it('decodes to an empty string for undefined', () => {
    expect(
      u8aToString()
    ).toEqual('');
  });

  it('decodes to an empty string for empty buffer', () => {
    expect(
      u8aToString(new Uint8Array([]))
    ).toEqual('');
  });

  it('decodes the buffer correctly', () => {
    expect(
      u8aToString(
        new Uint8Array([21, 23, 45, 67])
      )
    ).toEqual('21,23,45,67');
  });
});
