// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const createKeccak = require('keccak');

/**
  @name keccakAsBuffer
  @signature keccakAsBuffer (value: Buffer | Uint8Array | string): Buffer
  @summary Creates a keccak Buffer from the input.
  @description
    From either a `string` or a `Buffer` input, create the keccak and return the result as a `Buffer`.
  @example
    import { keccakAsBuffer } from '@polkadot/util-crypto';

    console.log('asBuffer', keccakAsBuffer('123')) // => Buffer
*/
module.exports = function keccakAsBuffer (value: Buffer | Uint8Array | string): Buffer {
  // HACK: For the time being, don't change the definition (although fork of library is used)
  // flowlint-next-line unclear-type:off
  return createKeccak('keccak256').update(((value: any): Buffer)).digest();
};
