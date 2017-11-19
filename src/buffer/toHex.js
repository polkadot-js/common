// ISC, Copyright 2017 Jaco Greeff
// @flow

const isBuffer = require('../is/buffer');
const hexAddPrefix = require('../hex/addPrefix');

const ZERO_HEX = '0x';

module.exports = function toHex (value?: Buffer): string {
  if (!value) {
    return ZERO_HEX;
  }

  if (!isBuffer(value)) {
    throw new Error(`Cannot convert non-buffer to hex`);
  }

  return hexAddPrefix(
    value.toString('hex')
  );
};
