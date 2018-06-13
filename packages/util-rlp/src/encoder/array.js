// Copyright 2017-2018 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { EncodeFunc } from './types';

const u8aConcat = require('@polkadot/util/u8a/concat');

const encodeLength = require('./length');

// flowlint-next-line unclear-type:off
module.exports = function encodeArray (encoder: EncodeFunc, input: any): Uint8Array {
  const encoded = u8aConcat.apply(null, input.map(encoder));

  return u8aConcat(
    encodeLength(encoded.length, 192),
    encoded
  );
};
