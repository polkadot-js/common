// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const encoder = require('./encoder');

/**
  @name encode
  @signature encode (input: any): Uint8Array
  @summary Encodes the input value into RLP.
  @description
    From an input, calculate the RLP and return the result as a `Uint8Array`.
  @example
    import { encode } from '@polkadot/util-rlp';

    encode('dog') // => [0x83, 0x64, 0x6f, 0x67]
*/
module.exports = encoder;
