// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { EncodeFunc } from './types';

const u8aConcat = require('@polkadot/util/u8a/concat');

const encodeLength = require('./length');

// flowlint-next-line unclear-type:off
module.exports = function encodeArray (encoder: EncodeFunc, input: any): Uint8Array {
  const output = [];

  for (let i = 0; i < input.length; i++) {
    output.push(
      encoder(input[i])
    );
  }

  const encoded = u8aConcat(output);

  return u8aConcat([
    encodeLength(encoded.length, 192),
    encoded
  ]);
};
