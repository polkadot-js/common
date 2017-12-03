// ISC, Copyright 2017 Jaco Greeff
// @flow

const BN = require('bn.js');

const assert = require('../assert');
const hexAddPrefix = require('../hex/addPrefix');
const isBN = require('../is/bn');

const ZERO_STR = '0x';

/**
  @name bnToHex
  @signature bnToHex (value?: BN): string
  @summary Creates a hex value from a BN.js bignumber object.
  @description
    `null` inputs returns a `0x` result, BN values return the actual value as a `0x` prefixed hex value. Anything that is not a BN object throws an error.
  @example
    import BN from 'bn.js';
    import { bnToHex } from '@polkadot/util';

    console.log('Hex value', bnToHex(new BN(123456));
*/
module.exports = function bnToHex (value?: BN): string {
  if (!value) {
    return ZERO_STR;
  }

  assert(isBN(value), `Cannot convert from non-BN value '${(value: any)}' to hex`);

  return hexAddPrefix(value.toString(16));
};
