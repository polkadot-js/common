// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import testdata from '../../trie-root/test/data';

import Trie from './index';

describe('substrate tests', () => {
  let trie;

  const checkRoot = ({ root }) =>
    expect(trie.getRoot()).toEqual(root);

  const putValues = ({ input }) =>
    input.forEach(({ k, v }) => trie.put(k, v));

  beforeEach(() => {
    trie = new Trie();
  });

  Object.values(testdata).forEach((test) => {
    it(`hashes ${test.desc}`, () => {
      putValues(test);
      checkRoot(test);
    });
  });

  // 0xfe12001404031404ff2404081904fe
  // 0xfe12001404031404ff2404081904fe

  // it('does twoValues', () => {
  //   putValues(testdata.twoValues);
  //   checkRoot(testdata.twoValues);
  // });

  // 0x810a24fe000c0410    0c010411
  // 0x810a2cfe000c0c0104100c010411

  // it('does extensionBranch', () => {
  //   putValues(testdata.extensionBranch);
  //   checkRoot(testdata.extensionBranch);
  // });

  // 0x82aa34fe000c10810a04aa10020b04ab
  // 0x82aa3cff000c04a010020a04aa10020b04ab

  // it('does extensionBranchValue', () => {
  //   putValues(testdata.extensionBranchValue);
  //   checkRoot(testdata.extensionBranchValue);
  // });
});
