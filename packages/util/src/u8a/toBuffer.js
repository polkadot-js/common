// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

/**
  @name u8aToBuffer
  @signature u8aToBuffer (value?: UInt8Array): Buffer
  @summary Creates a Buffer object from a hex string.
  @description
    `null` inputs returns an empty `Buffer` result. `UInt8Array` input values return the actual bytes value converted to a `Buffer`. Anything that is not a `UInt8Array` throws an error.
  @example
    import { u8aToBuffer } from '@polkadot/util';

    console.log('Buffer', u8aToBuffer('0x123480001f'));
*/
module.exports = function u8aToBuffer (value?: Uint8Array): Buffer {
  if (!value) {
    return Buffer.from([]);
  }

  return Buffer.from(value);
};
