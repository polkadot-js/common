// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DecodeFunc, DecodeOutput } from './types';

const safeParseInt = require('../util/safeParseInt');

module.exports = function decodeListLong (decode: DecodeFunc, input: Uint8Array): DecodeOutput {
  const llength = input[0] - 0xf6;
  const length = safeParseInt(input.slice(1, llength));
  const totalLength = llength + length;
  const decoded = [];

  if (totalLength > input.length) {
    throw new Error('invalid rlp: total length is larger than the data');
  }

  let innerRemainder = input.slice(llength, totalLength);

  if (innerRemainder.length === 0) {
    throw new Error('invalid rlp, List has a invalid length');
  }

  while (innerRemainder.length) {
    const d = decode(innerRemainder);

    decoded.push(d.decoded);
    innerRemainder = d.remainder;
  }

  return {
    decoded,
    remainder: input.slice(totalLength)
  };
};
