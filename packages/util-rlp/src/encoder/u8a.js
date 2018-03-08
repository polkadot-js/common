// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { EncodeFunc } from './types';

const u8aConcat = require('@polkadot/util/u8a/concat');

const encodeLength = require('./length');

module.exports = function encodeU8a (encoder: EncodeFunc, input: Uint8Array): Uint8Array {
  if (input.length === 1 && input[0] < 128) {
    return input;
  }

  return u8aConcat(
    encodeLength(input.length, 128),
    input
  );
};
