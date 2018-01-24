// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { xxhashjs$Result } from 'xxhashjs';

const isBuffer = require('@polkadot/util/is/buffer');
const isString = require('@polkadot/util/is/string');
const xxhashjs = require('xxhashjs');

module.exports = function xxhashAsValue (data: Buffer | Uint8Array | string, seed: number): xxhashjs$Result {
  if (isBuffer(data) || isString(data)) {
    return xxhashjs.h32(data, seed);
  }

  return xxhashjs.h32(data.buffer, seed);
};
