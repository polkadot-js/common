// ISC, Copyright 2017 Jaco Greeff
// @flow

const BN = require('bn.js');

const hexStripPrefix = require('./stripPrefix');

const ZERO_BN = new BN(0);

/**
  @name hexToBn
  @signature hexToBn (value?: string): BN
  @summary Creates a BN.js bignumber object from a hex string.
  @description
    `null` inputs returns a `BN(0)` result. Hex input values return the actual value converted to a BN. Anything that is not a hex string (including the `0x` prefix) throws an error.
  @example
    import { hexToBn } from '@polkadot/util';

    hexToBn('0x123480001f'); // => BN(0x123480001f)
*/
module.exports = function hexToBn (value?: string): BN {
  // flowlint-next-line sketchy-null-string:off
  if (!value) {
    return ZERO_BN;
  }

  return new BN(hexStripPrefix(value), 16);
};
