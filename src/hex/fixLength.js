// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('../assert');
const isHex = require('../is/hex');
const hexAddPrefix = require('./addPrefix');
const hexStripPrefix = require('./stripPrefix');
const { ZEROS_256 } = require('./constants');

/**
  @name hexFixLength
  @signature hexFixLength (value: string, bitLength: number = -1): string
  @summary Pads or shifts a hex string to a specific bitLength
  @description
    Returns a `0x` prefixed string with the specified number of bits contained in the return value. (If bitLength is -1, length checking is not done). Input values with less bits are zero-padded, values with more bits are trimmed to the specified length.
  @example
    import { hexFixLength } from '@polkadot/util';

    console.log('fixed', hexFixLength('0x12', 16)) // => 0x0012
    console.log('fixed', hexFixLength('0x0012', 8)) // => 0x12
*/
module.exports = function hexFixLength (value: string, bitLength: number = -1): string {
  assert(isHex(value), `Expected hex input value, found '${value}' instead`);

  if (bitLength === -1) {
    return value;
  }

  const strLength = bitLength / 4;
  const hexLength = strLength + 2;

  if (value.length === hexLength) {
    return value;
  }

  if (value.length > hexLength) {
    return hexAddPrefix(
      hexStripPrefix(value).slice(-1 * strLength)
    );
  }

  return hexAddPrefix(
    `${ZEROS_256}${hexStripPrefix(value)}`.slice(-1 * strLength)
  );
};
