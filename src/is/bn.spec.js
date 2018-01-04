// ISC, Copyright 2017-2018 Jaco Greeff

const BN = require('bn.js');

const { isBN } = require('./index');

describe('isBN', () => {
  it('returns true when a BN value', () => {
    expect(
      isBN(new BN(123))
    ).toEqual(true);
  });

  it('returns false on non-BN values', () => {
    expect(
      isBN(0)
    ).toEqual(false);
  });
});
