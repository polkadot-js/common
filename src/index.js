// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const array = require('./array');
const assert = require('./assert');
const bn = require('./bn');
const buffer = require('./buffer');
const ext = require('./ext');
const hex = require('./hex');
const is = require('./is');
const jsonrpc = require('./jsonrpc');
const keccak = require('./keccak');
const logger = require('./logger');
const number = require('./number');
const promisify = require('./promisify');
const string = require('./string');
const u8a = require('./u8a');

/**
  @summary Utility methods for this package are split into groups
*/
module.exports = Object.assign(
  {}, array, { assert }, bn, buffer, ext, hex, is, jsonrpc, keccak, { logger }, number, { promisify }, string, u8a
);
