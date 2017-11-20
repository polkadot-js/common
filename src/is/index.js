// ISC, Copyright 2017 Jaco Greeff
// @flow

const isBN = require('./bn');
const isFunction = require('./function');
const isHex = require('./hex');
const isInstanceOf = require('./instanceOf');
const isNumber = require('./number');
const isString = require('./string');
const isUndefined = require('./undefined');

/**
  @summary Type checking utilities
*/
module.exports = {
  isBN,
  isFunction,
  isHex,
  isInstanceOf,
  isNumber,
  isString,
  isUndefined
};
