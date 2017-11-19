// ISC, Copyright 2017 Jaco Greeff
// @flow

const isHex = require('../is/hex');

module.exports = function hasPrefix (value: ?string): boolean {
  return !!(value && isHex(value) && value.substr(0, 2) === '0x');
};
