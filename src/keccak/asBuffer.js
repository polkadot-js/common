// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

const createKeccak = require('keccak');

/**
  @name keccakAsBuffer
  @signature keccakAsBuffer (value: Buffer | string): Buffer
  @summary Creates a keccak Buffer from the input.
  @description
    From either a `string` or a `Buffer` input, create the keccak and return the result as a `Buffer`.
  @example
    import { keccakAsBuffer } from '@polkadot/util';

    console.log('asBuffer', keccakAsBuffer('123')) // => Buffer
*/
module.exports = function keccakAsBuffer (value: Buffer | string): Buffer {
  return createKeccak('keccak256').update(value).digest();
};
