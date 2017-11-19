// ISC, Copyright 2017 Jaco Greeff
// @flow

const createKeccak = require('keccak');

module.exports = function keccakAsBuffer (value: Buffer | string): Buffer {
  return createKeccak('keccak256').update(value).digest();
};
