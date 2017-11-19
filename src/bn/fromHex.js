// ISC, Copyright 2017 Jaco Greeff
// @flow

const BN = require('bn.js');

const { stripHexPrefix } = require('../hex');
const isHex = require('../is/hex');

const ZERO_BN = new BN(0);

module.exports = function fromHex (value?: string): BN {
  if (!value) {
    return ZERO_BN;
  }

  if (!isHex(value)) {
    throw new Error(`Cannot convert from non-hex value '${value}' to BN`);
  }

  return new BN(stripHexPrefix(value), 16);
};
