// ISC, Copyright 2017 Jaco Greeff
// @flow

const isInstanceOf = require('./instanceOf');

module.exports = function isBuffer (value?: any): boolean {
  return isInstanceOf(value, Buffer);
};
