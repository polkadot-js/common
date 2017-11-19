// ISC, Copyright 2017 Jaco Greeff
// @flow

const isFunction = require('./function');
const isHex = require('./hex');
const isInstanceOf = require('./instanceOf');
const isNumber = require('./number');
const isString = require('./string');
const isUndefined = require('./undefined');

module.exports = {
  isFunction,
  isHex,
  isInstanceOf,
  isNumber,
  isString,
  isUndefined
};
