// Copyright 2017-2018 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const encodeLength = require('./length');

describe('encodeLength', () => {
  it('returns offset + length where <= 55', () => {
    expect(
      encodeLength(5, 6)
    ).toEqual(
      new Uint8Array([11])
    );
  });

  it('encodes > 55 length properly (short)', () => {
    expect(
      encodeLength(56, 6)
    ).toEqual(
      new Uint8Array([62, 56])
    );
  });

  it('encodes > 55 length properly (long)', () => {
    expect(
      encodeLength(512, 6)
    ).toEqual(
      new Uint8Array([63, 2, 0])
    );
  });
});
