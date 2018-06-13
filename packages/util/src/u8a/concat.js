// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const u8aToU8a = require('./toU8a');

/**
  @name u8aConcat
  @signature u8aConcat (...values: Array<Uint8Array | string>): Uint8Array
  @summary Creates a concatenated Uint8Array from the inputs.
  @description
    Concatenates the input arrays into a single `UInt8Array`.
  @example
    import { u8aConcat } from '@polkadot/util';

    u8aConcat(
      new Uint8Array([1, 2, 3]),
      new Uint8Array([4, 5, 6])
    ); // [1, 2, 3, 4, 5, 6]
*/
module.exports = function u8aConcat (..._list: Array<Uint8Array | string>): Uint8Array {
  const list: Array<Uint8Array> = _list.map(u8aToU8a);
  const length = list.reduce((total, item) => total + item.length, 0);
  const result = new Uint8Array(length);
  let offset = 0;

  return list.reduce((result, item) => {
    result.set(item, offset);
    offset += item.length;

    return result;
  }, result);
};
