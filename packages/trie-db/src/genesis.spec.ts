// Copyright 2017-2018 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import bbqbirch from '@polkadot/chainspec/bbqbirch';
import { hexToU8a, u8aToHex } from '@polkadot/util/index';

import Trie from './index';

describe('genesis roots', () => {
  [
    bbqbirch
  ].forEach(({ genesis: { raw }, genesisRoot, name }) => {
    it(`has the correct root for ${name}`, () => {
      const trie = new Trie();

      Object.keys(raw).forEach((key) => {
        trie.put(hexToU8a(key), hexToU8a(raw[key]));
      });

      expect(
        u8aToHex(trie.getRoot())
      ).toEqual(genesisRoot);
    });
  });
});
