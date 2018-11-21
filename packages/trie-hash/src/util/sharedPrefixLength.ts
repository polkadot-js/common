// Copyright 2017-2018 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Trie$Pairs } from '../types';

import getSharedLength from './sharedLength';

/**
 * @name sharedPrefixLength
 * @signature sharedPrefixLength (pairs: Trie$Pairs): number
 */
export default function sharedPrefixLength (pairs: Trie$Pairs): number {
  return pairs.reduce((length, { k }, index) => {
    if (index === 0) {
      return k.length;
    }

    return Math.min(
      getSharedLength(pairs[0].k, k),
      length
    );
  }, 0);
}
