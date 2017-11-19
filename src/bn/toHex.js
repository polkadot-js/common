// ISC, Copyright 2017 Jaco Greeff
// @flow

const BN = require('bn.js');

const { addHexPrefix } = require('../hex');

const ZERO_STR = '0x';

module.exports = function toHex (value?: BN): string {
  if (!value) {
    return ZERO_STR;
  }

  if (!BN.isBN(value)) {
    throw new Error(`Cannot convert from non-BN value '${value}' to hex`);
  }

  return addHexPrefix(value.toString(16));
};
