// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

/**
  @name u8aToHex
  @signature u8aToHex (value?: UInt8Array): string
  @summary Creates a hex string from a Uint8Array object.
  @description
    `UInt8Array` input values return the actual hex string. `null` or `undefined` values returns an `0x` string.
  @example
    import { u8aToHex } from '@polkadot/util';

    u8aToHex(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0xf])); // 0x68656c0f
*/
module.exports = function u8aToHex (value?: Uint8Array): string {
  if (!value || !value.length) {
    return '0x';
  }

  return value.reduce((result, item) => {
    return result + ('0' + item.toString(16)).slice(-2);
  }, '0x');
};
