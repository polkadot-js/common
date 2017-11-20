// ISC, Copyright 2017 Jaco Greeff
// @flow

const isHex = require('../is/hex');
const hexStripPrefix = require('../hex/stripPrefix');

const EMPTY_BUFFER = Buffer.from([]);

/**
  @name bufferFromHex
  @signature bufferFromHex (value?: string): Buffer
  @summary Creates a Buffer object from a hex string.
  @description
    `null` inputs returns an empty `Buffer` result. Hex input values return the actual bytes value converted to a Buffer. Anything that is not a hex string (including the `0x` prefix) throws an error.
  @example
    import { bufferFromHex } from '@polkadot/util';

    console.log('Buffer object', bufferFromHex('0x123480001f'));
*/
module.exports = function bufferFromHex (value?: string): Buffer {
  if (!value) {
    return EMPTY_BUFFER;
  }

  if (!isHex(value)) {
    throw new Error(`Cannot convert non-hex value '${value}' to Buffer`);
  }

  return Buffer.from(hexStripPrefix(value), 'hex');
};
