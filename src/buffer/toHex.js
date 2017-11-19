// ISC, Copyright 2017 Jaco Greeff
// @flow

const isBuffer = require('../is/buffer');
const { addHexPrefix } = require('../hex');

const ZERO_HEX = '0x';

module.exports = function toHex (value?: Buffer): string {
  if (!value) {
    return ZERO_HEX;
  }

  if (!isBuffer(value)) {
    throw new Error(`Cannot convert non-buffer to hex`);
  }

  return addHexPrefix(
    value.toString('hex')
  );
};
