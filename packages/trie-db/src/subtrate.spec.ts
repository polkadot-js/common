// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aToHex } from '@polkadot/util/index';

import testdata, { TestData } from '../../trie-root/test/data';
import Trie from './index';

describe('substrate tests', () => {
  let trie: Trie;

  const checkRoot = ({ root }: TestData) =>
    expect(
      u8aToHex(trie.getRoot())
    ).toEqual(
      u8aToHex(root)
    );

  const putValues = ({ input }: TestData) =>
    input.forEach(({ k, v }) =>
      trie.put(k, v)
    );

  beforeEach(() => {
    trie = new Trie();
  });

  // Object.values(testdata).forEach((test) => {
  //   it(`hashes ${test.desc}`, () => {
  //     putValues(test);
  //     checkRoot(test);
  //   });
  // });

  // fe8c00682007b3872d47181b4a2dc15f0da43e702620e80300000000000080170d322ac49d8708f151346c
  // 4c
  // d9e58452d83a9d3b710e1ead35eb3269ab2353
  // 68200935e46f94f24b82716c0142e2271de9200087000000000000

  // fe8c00682007b3872d47181b4a2dc15f0da43e702620e80300000000000080170d322ac49d8708f151346c
  // 68
  // d9e58452d83a9d3b710e1ead35eb3269ab2353
  // 68200935e46f94f24b82716c0142e2271de9200087000000000000

  it('does substrate0', () => {
    console.error('hex', u8aToHex(testdata.substrate0.output));

    putValues(testdata.substrate0);
    checkRoot(testdata.substrate0);
  });
});
