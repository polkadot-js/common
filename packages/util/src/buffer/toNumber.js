// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

/**
  @name bufferToNumber
  @signature bufferToNumber (value?: Buffer): number
  @summary Creates a Number value from a Buffer object.
  @description
    `null` inputs returns an NaN result, `Buffer` values return the actual value as a `Number`.
  @example
    import { bufferToNumber } from '@polkadot/util';

    bufferToNumber(Buffer.from([12, 34, 56])); // => 0x123456
*/
module.exports = function bufferToNumber (buffer?: Buffer): number {
  if (!buffer || !buffer.length) {
    return NaN;
  }

  const length = buffer.length;
  let value = 0;

  for (let index = 0; index < length; ++index) {
    value = (value * 256) + buffer[index];
  }

  return value;
};
