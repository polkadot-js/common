// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const isBuffer = require('@polkadot/util/is/buffer');

const { randomAsBuffer } = require('./index');

describe('randomAsBuffer', () => {
  it('generates a Buffer', () => {
    expect(
      isBuffer(randomAsBuffer())
    ).toEqual(true);
  });

  it('generated results does not match', () => {
    expect(
      randomAsBuffer()
    ).not.toEqual(
      randomAsBuffer()
    );
  });

  it('generates 32 bytes by default', () => {
    expect(
      randomAsBuffer()
    ).toHaveLength(32);
  });

  it('generates with the suuplied length', () => {
    expect(
      randomAsBuffer(66)
    ).toHaveLength(66);
  });
});
