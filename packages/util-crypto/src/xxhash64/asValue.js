// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { xxhashjs$Result } from 'xxhashjs';

const isBuffer = require('@polkadot/util/is/buffer');
const isString = require('@polkadot/util/is/string');
const u8aToBuffer = require('@polkadot/util/u8a/toBuffer');
const xxhashjs = require('xxhashjs');

module.exports = function xxhash64AsValue (data: Buffer | Uint8Array | string, seed: number): xxhashjs$Result {
  if (isBuffer(data) || isString(data)) {
    // $FlowFixMe we have determined the type
    return xxhashjs.h64(data, seed);
  }

  // $FlowFixMe we have determined the type
  return xxhashjs.h64(
    // HACK: We can't use data.buffer, it has the incorrect length
    u8aToBuffer(data),
    seed
  );
};
