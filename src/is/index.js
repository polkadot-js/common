// ISC, Copyright 2017 Jaco Greeff
// @flow

const isBN = require('./bn');
const isBuffer = require('./buffer');
const isError = require('./error');
const isFunction = require('./function');
const isHex = require('./hex');
const isInstanceOf = require('./instanceOf');
const isIp = require('./ip');
const isNull = require('./null');
const isNumber = require('./number');
const isObject = require('./object');
const isString = require('./string');
const isUint8Array = require('./uint8Array');
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
  isIp,
  isObject,
  isNull,
  isNumber,
  isString,
  isUint8Array,
  isUndefined
};
