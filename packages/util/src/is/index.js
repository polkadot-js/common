// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const isBN = require('./bn');
const isBuffer = require('./buffer');
const isBoolean = require('./boolean');
const isError = require('./error');
const isFunction = require('./function');
const isHex = require('./hex');
const isInstanceOf = require('./instanceOf');
const isIp = require('./ip');
const isNull = require('./null');
const isNumber = require('./number');
const isObject = require('./object');
const isString = require('./string');
const isU8a = require('./u8a');
const isUndefined = require('./undefined');

/**
  @summary Type checking utilities
*/
module.exports = {
  isBN,
  isBoolean,
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
  isU8a,
  isUndefined
};
