// ISC, Copyright 2017 Jaco Greeff
// @flow

const { addHexPrefix } = require('../hex');
const keccakAsString = require('./asString');

module.exports = function keccakAsHex (value: Buffer | string): string {
  return addHexPrefix(
    keccakAsString(value)
  );
};
