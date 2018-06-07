// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pair } from '@polkadot/util-triehash/types';
import type { Temp$Storage } from './types';

module.exports = function set (storage: Temp$Storage, k: Uint8Array, v: Uint8Array): void {
  storage[k] = ({
    k: k.slice(),
    v: v.slice()
  }: Trie$Pair);
};
