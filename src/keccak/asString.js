// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

const keccakAsBuffer = require('./asBuffer');

/**
  @name keccakAsString
  @signature keccakAsString (value: Buffer | string): string
  @summary Creates a keccak string from the input.
  @description
    From either a `string` or a `Buffer` input, create the keccak and return the result as a non-prefixed string.
  @example
    import { keccakAsString } from '@polkadot/util';

    console.log('asString', keccakAsString('123')) // => string
*/
module.exports = function keccakAsString (value: Buffer | string): string {
  return keccakAsBuffer(value).toString('hex');
};
