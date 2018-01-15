// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
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
