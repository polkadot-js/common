// Copyright 2017-2018 @polkadot/util-triehash authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from '../types';

const getSharedLength = require('./sharedLength');

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
