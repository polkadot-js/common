// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('../assert');
const isBuffer = require('../is/buffer');
const hexAddPrefix = require('../hex/addPrefix');

const ZERO_HEX = '0x';

/**
  @name bufferToHex
  @signature bufferToHex (value?: Buffer): string
  @summary Creates a hex value from a Buffer object.
  @description
    `null` inputs returns a `0x` result, `Buffer` values return the actual value as a `0x` prefixed hex value. Anything that is not a `Buffer` object throws an error.
  @example
    import { bufferToHex } from '@polkadot/util';

    console.log('Hex value', bufferToHex(Buffer.from([1, 2, 3]));
*/
module.exports = function bufferToHex (value?: Buffer): string {
  if (!value) {
    return ZERO_HEX;
  }

  assert(isBuffer(value), `Cannot convert non-buffer to hex`);

  return hexAddPrefix(
    value.toString('hex')
  );
};
