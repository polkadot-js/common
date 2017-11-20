// ISC, Copyright 2017 Jaco Greeff
// @flow

const keccakAsBuffer = require('./asBuffer');
const keccakAsHex = require('./asHex');
const keccakAsString = require('./asString');

/**
  @summary Create Keccak256 values as hex, string & buffer output
*/
module.exports = {
  keccakAsBuffer,
  keccakAsHex,
  keccakAsString
};
