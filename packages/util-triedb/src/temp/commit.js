// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from '@polkadot/util-triehash/types';
import type { Temp$Storage } from './types';

const del = require('./del');
const set = require('./set');

module.exports = function commit (storage: Temp$Storage, values: Trie$Pairs): void {
  values.forEach(({ k, v }) => {
    if (v && v.length) {
      set(storage, k, v);
    } else {
      del(storage, k);
    }
  });
};
