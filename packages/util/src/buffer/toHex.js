// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
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
