// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

require('./polyfill/textEncoder');

const encoder = new TextEncoder();

/**
  @name u8aFromUtf8
  @signature u8aFromUtf8 (value?: string): UInt8Array
  @summary Creates a Uint8Array object from a utf-8 string.
  @description
    String input values return the actual encoded `UInt8Array`. `null` or `undefined` values returns an empty encoded array.
  @example
    import { u8aFromUtf8 } from '@polkadot/util';

    u8aFromUtf8('hello'); // [0x68, 0x65, 0x6c, 0x6c, 0x6f]
*/
module.exports = function u8aFromUtf8 (value?: string): Uint8Array {
  // flowlint-next-line sketchy-null-string:off
  if (!value) {
    return new Uint8Array([]);
  }

  return encoder.encode(value);
};
