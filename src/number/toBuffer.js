// ISC, Copyright 2017 Jaco Greeff
// @flow

const bufferFromHex = require('../buffer/fromHex');
const isNull = require('../is/null');
const isUndefined = require('../is/undefined');
const numberToHex = require('./toHex');

/**
  @name numberToBuffer
  @signature numberToBuffer (value?: number): Buffer
  @summary Creates a Buffer object from a number.
  @description
    `null`/`undefined`/`NaN` inputs returns an empty `Buffer` result. `number` input values return the actual bytes value converted to a `Buffer`.
  @example
    import { numberToBuffer } from '@polkadot/util';

    const buffer = numberToBuffer('0x1234'); // => Buffer.from([0x12, 0x34])
*/
module.exports = function numberToBuffer (value?: number): Buffer {
  if (isUndefined(value) || isNull(value) || isNaN(value)) {
    return Buffer.from([]);
  }

  return bufferFromHex(
    numberToHex(value)
  );
};
