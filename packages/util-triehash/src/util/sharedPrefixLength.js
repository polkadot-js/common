// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from '../types';

function getSharedLength (a: Uint8Array, b: Uint8Array): number {
  const count = Math.min(a.length, b.length);

  for (let index = 0; index < count; index++) {
    if (a[index] !== b[index]) {
      return index;
    }
  }

  return count;
}

module.exports = function sharedPrefixLength (pairs: Trie$Pairs): number {
  return pairs.reduce((length, { k }, index) => {
    if (index === 0) {
      return k.length;
    }

    return Math.min(
      getSharedLength(pairs[0].k, k),
      length
    );
  }, 0);
};
