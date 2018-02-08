// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const decoder = require('./decoder');

/**
  @name decode
  @signature decoder (input?: Uint8Array): Uint8Array | Array<*>
  @summary Decodes the input RLP.
  @description
    From an input, decod the RLP and return the result as a `Uint8Array` or `Array`.
  @example
    import { decode } from '@polkadot/util-rlp';

    encode(new Uint8Array([0x83, 0x64, 0x6f, 0x67])) // => 'dog' as Uint8Array
*/
module.exports = decoder;
