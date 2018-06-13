// Copyright 2017-2018 @polkadot/util-triehash authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from './types';

const asNibbles = require('./util/asNibbles');
const genRoot = require('./util/genRoot');
const pairsUniq = require('./util/pairsUniq');

/**
  @name trieRoot
  @signature trieRoot (pairs: Trie$Pairs): Uint8Array
  @summary Creates a trie hash from the supplied pairs.
  @description
    From an `Array<{k: Uint8Array, v: Uint8Array}>` input, calculate the triehash and return the result as a `Uint8Array`.
  @example
    import { u8aFromString } from '@polkadot/util';
    import { trieRoot } from '@polkadot/util-triehash';

    trieRoot([{
      k: u8aFromString('A'),
      v: u8aFromString('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
    }]) // => 0xd23786fb4a010da3ce639d66d5e904a11dbc02746d1ce25029e53290cabf28ab
*/
module.exports = function trieRoot (pairs: Trie$Pairs): Uint8Array {
  return genRoot(
    pairsUniq(pairs).map(({ k, v }) => ({
      k: asNibbles(k),
      v
    }))
  );
};
