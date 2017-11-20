// ISC, Copyright 2017 Jaco Greeff
// @flow

const BN = require('bn.js');

const hexStripPrefix = require('../hex/stripPrefix');
const isHex = require('../is/hex');

const ZERO_BN = new BN(0);

/**
  @name bnFromHex
  @signature bnFromHex (value?: string): BN
  @summary Creates a BN.js bignumber object from a hex string.
  @description
    `null` inputs returns a `BN(0)` result. Hex input values return the actual value converted to a BN. Anything that is not a hex string (including the `0x` prefix) throws an error.
  @example
    import { bnFromHex } from '@polkadot/util';

    console.log('BN object', bnFromHex('0x123480001f'));
*/
module.exports = function bnFromHex (value?: string): BN {
  if (!value) {
    return ZERO_BN;
  }

  if (!isHex(value)) {
    throw new Error(`Cannot convert from non-hex value '${value}' to BN`);
  }

  return new BN(hexStripPrefix(value), 16);
};
