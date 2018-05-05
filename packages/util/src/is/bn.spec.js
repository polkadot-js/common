// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const BN = require('bn.js');

const { isBn } = require('./index');

describe('isBN', () => {
  it('returns true when a BN value', () => {
    expect(
      isBn(new BN(123))
    ).toEqual(true);
  });

  it('returns false on non-BN values', () => {
    expect(
      isBn(0)
    ).toEqual(false);
  });
});
