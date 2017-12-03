// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('../assert');
const isUint8Array = require('../is/uint8Array');

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

  assert(isUint8Array(value), 'Cannot convert non-Uint8Array value to Buffer');

  return Buffer.from(value);
};
