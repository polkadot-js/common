// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const isBn = require('./bn');
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
const isObservable = require('./observable');
const isString = require('./string');
const isU8a = require('./u8a');
const isUndefined = require('./undefined');

/**
  @summary Type checking utilities
*/
module.exports = {
  isBn,
  isBoolean,
  isBuffer,
  isError,
  isFunction,
  isHex,
  isInstanceOf,
  isIp,
  isObject,
  isObservable,
  isNull,
  isNumber,
  isString,
  isU8a,
  isUndefined
};
