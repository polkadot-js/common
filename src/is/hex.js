// ISC, Copyright 2017 Jaco Greeff
// @flow

const isString = require('./string');

const HEX_REGEX = /^0x[a-fA-F0-9]+$/;

/**
  @name isHex
  @signature isHex (value: any): boolean
  @summary Tests for a hex string.
  @description
    Checks to see if the input value is a `0x` prefixed hex string.
  @example
    import { isHex } from '@polkadot/util';

    console.log('isHex', isHex('0x1234')); // => true
*/
module.exports = function isHex (value: any): boolean {
  return isString(value) && HEX_REGEX.test(value);
};
