// ISC, Copyright 2017 Jaco Greeff
// @flow

const BN = require('bn.js');

module.exports = function isBN (value: any): boolean {
  return BN.isBN(value);
};
