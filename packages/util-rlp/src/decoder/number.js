// Copyright 2017-2018 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DecodeFunc, DecodeOutput } from './types';

const assert = require('@polkadot/util/assert');

const safeParseInt = require('./safeParseInt');

module.exports = function decodeNumber (decode: DecodeFunc, input: Uint8Array): DecodeOutput {
  const llength = input[0] - 0xb6;
  const length = safeParseInt(input.slice(1, llength));
  const decoded = input.slice(llength, length + llength);

  assert(decoded.length === length, 'invalid RLP');

  return {
    decoded,
    remainder: input.slice(length + llength)
  };
};
