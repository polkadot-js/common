// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aToHex = require('./toHex');

/**
  @name u8aToHexShort
  @signature u8aToHexShort (value?: UInt8Array, max: number = 16): string
  @summary Creates a hex string from a Uint8Array object with max characters.
  @description
    `UInt8Array` input values return the actual hex string shortened to the specified characters. `null` or `undefined` values returns an `0x` string.
  @example
    import { u8aToHexShort } from '@polkadot/util';

    u8aToHexShort(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0xf]), 4); // 0x68...0f
*/
module.exports = function u8aToHexShort (value?: Uint8Array, _max: number = 16): string {
  if (!value || !value.length) {
    return '0x';
  }

  const max = _max / 2;

  if (value.length <= max) {
    return u8aToHex(value);
  }

  return `${u8aToHex(value.subarray(0, max))}…`;
};
