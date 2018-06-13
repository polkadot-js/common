// Copyright 2017-2018 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const safeParseInt = require('./safeParseInt');

describe('safeParseInt', () => {
  it('does not allow 0 in first position', () => {
    expect(
      () => safeParseInt(
        new Uint8Array([0])
      )
    ).toThrow(/invalid RLP: extra zeros/);
  });

  it('converts a value to the correct number', () => {
    expect(
      safeParseInt(
        new Uint8Array([0x12, 0x34, 0x56])
      )
    ).toEqual(0x123456);
  });
});
