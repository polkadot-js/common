// ISC, Copyright 2017 Jaco Greeff
// @flow

const keccakAsBuffer = require('./asBuffer');
const bufferToHex = require('../buffer/toHex');

/**
  @name keccakAsHex
  @signature keccakAsHex (value: Buffer | string): string
  @summary Creates a keccak hex string from the input.
  @description
    From either a `string` or a `Buffer` input, create the keccak and return the result as a `0x` prefixed hex string.
  @example
    import { keccakAsHex } from '@polkadot/util';

    console.log('asHex', keccakAsHex('123')) // => 0x...
*/
module.exports = function keccakAsHex (value: Buffer | string): string {
  return bufferToHex(
    keccakAsBuffer(value)
  );
};
