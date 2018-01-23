// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const hexAddPrefix = require('../hex/addPrefix');
const isNull = require('../is/null');
const isUndefined = require('../is/undefined');

/**
  @name numberToHex
  @signature numberToHex (value?: number): string
  @summary Creates a hex value from a number.
  @description
    `null`/`undefined`/`NaN` inputs returns an empty `0x` result. `number` input values return the actual bytes value converted to a `hex`.
  @example
    import { numberToHex } from '@polkadot/util';

    const hex = numberToHex(0x1234); // => '0x1234'
*/
module.exports = function numberToHex (value?: number): string {
  if (isUndefined(value) || isNull(value) || isNaN(value)) {
    return '0x';
  }

  return hexAddPrefix(
    (value || 0).toString(16)
  );
};
