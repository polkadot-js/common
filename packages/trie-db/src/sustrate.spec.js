// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import toU8a from '@polkadot/util/u8a/toU8a';

import Trie from './index';

describe('substrate tests', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('starts with an equivalent empty root', () => {
    expect(
      trie.getRoot()
    ).toEqual(
      toU8a('0x03170a2e7597b7b7e3d84c05391d139a62b157e78786d8c082f29dcf4c111314')
    );
  });
});
