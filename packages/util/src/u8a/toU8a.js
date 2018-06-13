// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const isU8a = require('../is/u8a');
const hexToU8a = require('../hex/toU8a');

/**
  @name u8aToU8a
  @signature u8aToU8a (value?: Uint8Array | string): Uint8Array
  @summary Creates a Uint8Array value from a Uint8Array bignumber or hex input.
  @description
    `null` inputs returns a `[]` result, Uint8Array values returns the value, hex strings returns a Uint8Array representation.
  @example
    import { u8aToU8a } from '@polkadot/util';

    u8aToU8a(new Uint8Array([0x12, 0x34]); // => Uint8Array([0x12, 0x34])
    u8aToU8a(0x1234); // => Uint8Array([0x12, 0x34])
*/
module.exports = function u8aToU8a (value?: Uint8Array | string | null): Uint8Array {
  // flowlint-next-line sketchy-null-string:off
  if (!value) {
    return new Uint8Array(0);
  }

  return isU8a(value)
    // $FlowFixMe type is determined
    ? value
    // $FlowFixMe type is determined
    : hexToU8a(value);
};
