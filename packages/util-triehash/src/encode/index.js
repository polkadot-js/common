// Copyright 2017-2018 @polkadot/util-triehash authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from '../types';

// FIXME: This is horrible, but since aux calls back into encode (and ius used by the signgular encodes below, we set the export to valid before it is used)
module.exports = encode;

const encodePairs = require('./pairs');
const encodeShared = require('./shared');
const encodeSingle = require('./single');
const sharedPrefixLength = require('../util/sharedPrefixLength');

// flowlint-next-line unclear-type:off
function encode (pairs: Trie$Pairs, preLength: number): Array<any> {
  if (pairs.length === 0) {
    return [];
  }

  if (pairs.length === 1) {
    return encodeSingle(pairs[0], preLength);
  }

  const sharedLength = sharedPrefixLength(pairs);

  if (sharedLength > preLength) {
    return encodeShared(pairs, preLength, sharedLength);
  }

  const result = encodePairs(pairs, preLength);

  result.push(
    preLength !== pairs[0].k.length
      ? ''
      : pairs[0].v
  );

  return result;
}
