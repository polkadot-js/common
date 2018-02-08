// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

/**
  @name u8aConcat
  @signature u8aConcat (values: Array<Uint8Array>): Uint8Array
  @summary Creates a concatenated Uint8Array from the inputs.
  @description
    Concatenates the input arrays into a single `UInt8Array`.
  @example
    import { u8aConcat } from '@polkadot/util';

    u8aConcat([
      new Uint8Array([1, 2, 3]),
      new Uint8Array([4, 5, 6])
    ]); // [1, 2, 3, 4, 5, 6]
*/
module.exports = function u8aConcat (list: Array<Uint8Array>): Uint8Array {
  const length = list.reduce((total, item) => total + item.length, 0);
  let offset = 0;

  return list.reduce((result, item) => {
    result.set(item, offset);
    offset += item.length;

    return result;
  }, new Uint8Array(length));
};
