// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

const hexToBuffer = require('../hex/toBuffer');
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

    const buffer = numberToBuffer(0x1234); // => Buffer.from([0x12, 0x34])
*/
module.exports = function numberToBuffer (value?: number): Buffer {
  if (isUndefined(value) || isNull(value) || isNaN(value)) {
    return Buffer.from([]);
  }

  return hexToBuffer(
    numberToHex(value)
  );
};
