// ISC, Copyright 2017 Jaco Greeff
// @flow

const keccakAsBuffer = require('./asBuffer');
const bufferToHex = require('../buffer/toHex');

module.exports = function keccakAsHex (value: Buffer | string): string {
  return bufferToHex(
    keccakAsBuffer(value)
  );
};
