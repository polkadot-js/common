// ISC, Copyright 2017 Jaco Greeff
// @flow

const isBN = require('./bn');
const isBuffer = require('./buffer');
const isError = require('./error');
const isFunction = require('./function');
const isHex = require('./hex');
const isInstanceOf = require('./instanceOf');
const isNull = require('./null');
const isNumber = require('./number');
const isString = require('./string');
const isUndefined = require('./undefined');

/**
  @summary Type checking utilities
*/
module.exports = {
  isBN,
  isBuffer,
  isError,
  isFunction,
  isHex,
  isInstanceOf,
  isNull,
  isNumber,
  isString,
  isUndefined
};
