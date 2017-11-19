// ISC, Copyright 2017 Jaco Greeff
// @flow

const isString = require('./string');

const HEX_REGEX = /^0x[a-fA-F0-9]+$/;

module.exports = function isHex (value: any): boolean {
  return isString(value) && HEX_REGEX.test(value);
};
