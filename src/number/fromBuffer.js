// ISC, Copyright 2017 Jaco Greeff
// @flow

/**
  @name numberFromBuffer
  @signature numberFromBuffer (value?: Buffer): number
  @summary Creates a Number value from a Buffer object.
  @description
    `null` inputs returns an NaN result, `Buffer` values return the actual value as a `Number`.
  @example
    import { numberFromBuffer } from '@polkadot/util';

    numberFromBuffer(Buffer.from([12, 34, 56])); // => 0x123456
*/
module.exports = function numberFromBuffer (buffer?: Buffer): number {
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
