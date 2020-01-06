// Copyright 2017-2020 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aToHex } from '@polkadot/util';

import testdata, { TestData } from '../../trie-hash/test/data';
import Trie from '.';

describe('substrate tests', (): void => {
  let trie: Trie;

  const checkRoot = ({ root }: TestData): void => {
    expect(
      u8aToHex(trie.getRoot())
    ).toEqual(
      u8aToHex(root)
    );
  };

  const putValues = ({ input }: TestData): void => {
    input.forEach(({ k, v }): void => {
      trie.put(k, v);
    });
  };

  beforeEach((): void => {
    trie = new Trie();
  });

  Object.values(testdata).forEach((test): void => {
    it(`hashes ${test.desc}`, (): void => {
      putValues(test);
      checkRoot(test);
    });
  });

  // When we have a specific test failing and we want to debug it
  // it('does extensionBranch', (): void => {
  //   putValues(testdata.extensionBranch);
  //   checkRoot(testdata.extensionBranch);
  // });
});
