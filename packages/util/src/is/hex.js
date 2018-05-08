// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const isString = require('./string');

const HEX_REGEX = /^0x[a-fA-F0-9]+$/;

/**
  @name isHex
  @signature isHex (value: mixed, bitLength: number = -1): boolean
  @summary Tests for a hex string.
  @description
    Checks to see if the input value is a `0x` prefixed hex string. Optionally (`bitLength` !== -1) checks to see if the bitLength is correct.
  @example
    import { isHex } from '@polkadot/util';

    isHex('0x1234'); // => true
    isHex('0x1234', 8); // => false
*/
module.exports = function isHex (value: mixed, bitLength: number = -1): boolean {
  // $FlowFixMe for the regex we have a string
  const isValidHex = value === '0x' || (isString(value) && HEX_REGEX.test(value));

  if (isValidHex && bitLength !== -1) {
    // $FlowFixMe type is a string as checked above
    return value.length === (2 + bitLength / 4);
  }

  return isValidHex;
};
