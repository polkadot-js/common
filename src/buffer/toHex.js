// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

const hexAddPrefix = require('../hex/addPrefix');

const ZERO_HEX = '0x00';

/**
  @name bufferToHex
  @signature bufferToHex (value?: Buffer): string
  @summary Creates a hex value from a Buffer object.
  @description
    `null` inputs returns a `0x` result, `Buffer` values return the actual value as a `0x` prefixed hex value. Anything that is not a `Buffer` object throws an error.
  @example
    import { bufferToHex } from '@polkadot/util';

    bufferToHex(Buffer.from([1, 2, 3]); // => 0x010203
*/
module.exports = function bufferToHex (value?: Buffer): string {
  if (!value) {
    return ZERO_HEX;
  }

  return hexAddPrefix(
    value.toString('hex')
  );
};
