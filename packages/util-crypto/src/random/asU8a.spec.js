// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const isUint8Array = require('@polkadot/util/is/uint8Array');

const { randomAsU8a } = require('./index');

describe('randomAsU8a', () => {
  it('generates a Uint8Array', () => {
    expect(
      isUint8Array(randomAsU8a())
    ).toEqual(true);
  });

  it('generated results does not match', () => {
    expect(
      randomAsU8a()
    ).not.toEqual(
      randomAsU8a()
    );
  });

  it('generates 32 bytes by default', () => {
    expect(
      randomAsU8a()
    ).toHaveLength(32);
  });

  it('generates with the suuplied length', () => {
    expect(
      randomAsU8a(66)
    ).toHaveLength(66);
  });
});
