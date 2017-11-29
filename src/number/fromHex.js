// ISC, Copyright 2017 Jaco Greeff
// @flow

const bufferFromHex = require('../buffer/fromHex');
const numberFromBuffer = require('./fromBuffer');

/**
  @name numberFromHex
  @signature numberFromHex (value?: Hex): number
  @summary Creates a Number value from a Buffer object.
  @description
    `null` inputs returns an Nan result, `hex` values return the actual value as a `Number`.
  @example
    import { numberFromHex } from '@polkadot/util';

    numberFromBuffer('0x1234'); // => 0x1234
*/
module.exports = function numberFromHex (value?: string): number {
  if (!value) {
    return NaN;
  }

  return numberFromBuffer(
    bufferFromHex(value)
  );
};
