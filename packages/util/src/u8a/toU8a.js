// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const isBuffer = require('../is/buffer');
const isHex = require('../is/hex');
const isString = require('../is/string');
const bufferToU8a = require('../buffer/toU8a');
const hexToU8a = require('../hex/toU8a');
const u8aFromUtf8 = require('./fromUtf8');

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
module.exports = function u8aToU8a (value?: Buffer | Uint8Array | string | null): Uint8Array {
  // flowlint-next-line sketchy-null-string:off
  if (!value) {
    return new Uint8Array(0);
  }

  if (isBuffer(value)) {
    // $FlowFixMe type is determined
    return bufferToU8a(value);
  }

  if (isString(value)) {
    if (isHex(value)) {
      // $FlowFixMe type is determined
      return hexToU8a(value);
    }

    // $FlowFixMe type is determined
    return u8aFromUtf8(value);
  }

  // $FlowFixMe type is determined
  return value;
};
