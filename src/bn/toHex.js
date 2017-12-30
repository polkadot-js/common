// ISC, Copyright 2017 Jaco Greeff
// @flow

const BN = require('bn.js');

const hexAddPrefix = require('../hex/addPrefix');

const ZERO_STR = '0x00';

/**
  @name bnToHex
  @signature bnToHex (value?: BN): string
  @summary Creates a hex value from a BN.js bignumber object.
  @description
    `null` inputs returns a `0x` result, BN values return the actual value as a `0x` prefixed hex value. Anything that is not a BN object throws an error.
  @example
    import BN from 'bn.js';
    import { bnToHex } from '@polkadot/util';

    bnToHex(new BN(0x123456)); // => '0x123456'
*/
module.exports = function bnToHex (value?: BN): string {
  if (!value) {
    return ZERO_STR;
  }

  return hexAddPrefix(value.toString(16));
};
