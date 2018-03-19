// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pair } from '../types';

const encodeHexPrefix = require('./hexPrefix');

// flowlint-next-line unclear-type:off
module.exports = function encodeSingle (pair: Trie$Pair, preLength: number): Array<any> {
  return [
    encodeHexPrefix(
      pair.k.slice(preLength),
      true
    ),
    pair.v
  ];
};
