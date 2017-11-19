// ISC, Copyright 2017 Jaco Greeff
// @flow

const keccakAsBuffer = require('./asBuffer');

module.exports = function keccakAsString (value: Buffer | string): string {
  return keccakAsBuffer(value).toString('hex');
};
