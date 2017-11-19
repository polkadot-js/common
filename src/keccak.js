// ISC, Copyright 2017 Jaco Greeff
// @flow

const createKeccak = require('keccak');

const { addHexPrefix } = require('./hex');

function keccak (value: Buffer | string): string {
  return keccakAsBuffer(value).toString('hex');
}

function keccakAsBuffer (value: Buffer | string): Buffer {
  return createKeccak('keccak256').update(value).digest();
}

function keccakAsHex (value: Buffer | string): string {
  return addHexPrefix(
    keccak(value)
  );
}

module.exports = {
  keccak,
  keccakAsBuffer,
  keccakAsHex
};
