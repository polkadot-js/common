// Copyright 2017-2018 @polkadot/util-triehash authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from '../types';

const encodeAux = require('./aux');
const encodeHexPrefix = require('./hexPrefix');

// flowlint-next-line unclear-type:off
module.exports = function encodeShared (pairs: Trie$Pairs, preLength: number, sharedLength: number): Array<any> {
  return [
    encodeHexPrefix(
      pairs[0].k.slice(preLength, sharedLength),
      false
    ),
    encodeAux(pairs, sharedLength)
  ];
};
