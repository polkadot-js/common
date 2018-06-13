// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { isU8a } = require('./index');

describe('isUint8Array', () => {
  it('returns false on undefined values', () => {
    expect(
      isU8a()
    ).toEqual(false);
  });

  it('returns false on Array values', () => {
    expect(
      isU8a([])
    ).toEqual(false);
  });

  it('returns true on Uint8Array values', () => {
    expect(
      isU8a(new Uint8Array([]))
    ).toEqual(true);
  });
});
