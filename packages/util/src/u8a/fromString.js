// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

/**
  @name u8aFromString
  @signature u8aFromString (value: string): UInt8Array
  @summary Creates a Uint8Array object from a string.
  @description
    String input values return the actual encoded `UInt8Array`.
  @example
    import { u8aFromString } from '@polkadot/util';

    u8aFromString('hello'); // [0x68, 0x65, 0x6c, 0x6c, 0x6f]
*/
export default function u8aFromString (value: string): Uint8Array {
  const stringArray = [];

  for (let index = 0; index < value.length; index++) {
    stringArray.push(
      value.charCodeAt(index)
    );
  }

  return new Uint8Array(stringArray);
}
