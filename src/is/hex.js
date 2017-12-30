// ISC, Copyright 2017 Jaco Greeff
// @flow

const isString = require('./string');

const HEX_REGEX = /^0x[a-fA-F0-9]+$/;

/**
  @name isHex
  @signature isHex (value: string, bitLength: number = -1): boolean
  @summary Tests for a hex string.
  @description
    Checks to see if the input value is a `0x` prefixed hex string. Optionally (`bitLength` !== -1) checks to see if the bitLength is correct.
  @example
    import { isHex } from '@polkadot/util';

    isHex('0x1234'); // => true
    isHex('0x1234', 8); // => false
*/
module.exports = function isHex (value: string, bitLength: number = -1): boolean {
  const isValidHex = isString(value) && HEX_REGEX.test(value);

  if (isValidHex && bitLength !== -1) {
    return value.length === (2 + bitLength / 4);
  }

  return isValidHex;
};
