// ISC, Copyright 2017 Jaco Greeff
// @flow

const isString = require('./string');

module.exports = function isHex (value: any): boolean {
  return isString(value) && /^0x[a-fA-F0-9]+$/.test(value);
};
