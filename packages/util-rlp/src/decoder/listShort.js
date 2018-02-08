// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { DecodeFunc, DecodeOutput } from './types';

module.exports = function decodeListShort (decode: DecodeFunc, input: Uint8Array): DecodeOutput {
  const length = input[0] - 0xbf;
  let innerRemainder = input.slice(1, length);
  const decoded = [];

  while (innerRemainder.length) {
    const d = decode(innerRemainder);

    decoded.push(d.decoded);
    innerRemainder = d.remainder;
  }

  return {
    decoded,
    remainder: input.slice(length)
  };
};
