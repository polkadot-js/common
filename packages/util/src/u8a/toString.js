// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

/**
  @name u8aToString
  @signature u8aToString (value?: UInt8Array): string
  @summary Creates a string from a Uint8Array object.
  @description
    `UInt8Array` input values return the actual decoded string. `null` or `undefined` values returns an empty string.
  @example
    import { u8aToString } from '@polkadot/util';

    u8aToString(new Uint8Array([21,23,45,67])); // 21,23,45,67
*/
module.exports = function u8aToString (value?: Uint8Array): string {
  if (!value || !value.length) {
    return '';
  }

  return value.toString();
};
