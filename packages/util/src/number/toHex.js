// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const hexFixLength = require('../hex/fixLength');
const isNull = require('../is/null');
const isUndefined = require('../is/undefined');

/**
  @name numberToHex
  @signature numberToHex (value?: number): string
  @summary Creates a hex value from a number.
  @description
    `null`/`undefined`/`NaN` inputs returns an empty `0x` result. `number` input values return the actual bytes value converted to a `hex`. With `bitLength` set, it converts the number to the equivalent size.
  @example
    import { numberToHex } from '@polkadot/util';

    numberToHex(0x1234); // => '0x1234'
    numberToHex(0x1234, 32) // => 0x00001234
*/
module.exports = function numberToHex (value?: number, bitLength: number = -1): string {
  if (isUndefined(value) || isNull(value) || isNaN(value)) {
    return '0x';
  }

  return hexFixLength(
    (value || 0).toString(16),
    bitLength,
    true
  );
};
