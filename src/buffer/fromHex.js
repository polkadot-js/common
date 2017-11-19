// ISC, Copyright 2017 Jaco Greeff
// @flow

const isHex = require('../is/hex');
const hexStripPrefix = require('../hex/stripPrefix');

const EMPTY_BUFFER = Buffer.from([]);

module.exports = function fromHex (value?: string): Buffer {
  if (!value) {
    return EMPTY_BUFFER;
  }

  if (!isHex(value)) {
    throw new Error(`Cannot convert non-hex value '${value}' to Buffer`);
  }

  return Buffer.from(hexStripPrefix(value), 'hex');
};
