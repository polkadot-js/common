// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('../assert');
const isHex = require('../is/hex');
const hexAddPrefix = require('./addPrefix');
const hexStripPrefix = require('./stripPrefix');
const { ZEROS_256 } = require('./constants');

/**
  @name hexFixLength
  @signature hexFixLength (value: string, bitLength: number = -1, withPadding: boolean = false): string
  @summary Shifts a hex string to a specific bitLength
  @description
    Returns a `0x` prefixed string with the specified number of bits contained in the return value. (If bitLength is -1, length checking is not done). Values with more bits are trimmed to the specified length. Input values with less bits are returned as-is by default. When `withPadding` is set, shorter val;ues are padded with `0`.
  @example
    import { hexFixLength } from '@polkadot/util';

    console.log('fixed', hexFixLength('0x12', 16)) // => 0x12
    console.log('fixed', hexFixLength('0x12', 16, true)) // => 0x0012
    console.log('fixed', hexFixLength('0x0012', 8)) // => 0x12
*/
module.exports = function hexFixLength (value: string, bitLength: number = -1, withPadding: boolean = false): string {
  assert(isHex(value), `Expected hex input value, found '${value}' instead`);

  const strLength = bitLength / 4;
  const hexLength = strLength + 2;

  if (bitLength === -1 || value.length === hexLength || (!withPadding && value.length < hexLength)) {
    return hexAddPrefix(
      hexStripPrefix(value)
    );
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
