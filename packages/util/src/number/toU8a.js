// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const hexToU8a = require('../hex/toU8a');
const numberToHex = require('./toHex');

/**
  @name numberToU8a
  @signature numberToU8a (value?: number, bitLenght: number = -1): Uint8Array
  @summary Creates a Uint8Array object from a number.
  @description
    `null`/`undefined`/`NaN` inputs returns an empty `Uint8Array` result. `number` input values return the actual bytes value converted to a `Uint8Array`. With `bitLength`, it converts the value to the equivalent size.
  @example
    import { numberToU8a } from '@polkadot/util';

    numberToU8a(0x1234); // => [0x12, 0x34]
*/
module.exports = function numberToU8a (value?: number, bitLength: number = -1): Uint8Array {
  // flowlint-next-line sketchy-null-number:off
  if (!value || isNaN(value)) {
    return new Uint8Array([]);
  }

  return hexToU8a(
    numberToHex(value, bitLength)
  );
};
