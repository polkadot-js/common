// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import toU8a from '@polkadot/util/u8a/toU8a';
import u8aToHex from '@polkadot/util/u8a/toHex';

import Trie from '../src/Trie';
import { tests } from 'ethereumjs-testing';

const jsonTests = tests.trieTests;

describe('official tests', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  describe('ordered tests', () => {
    const testNames = Object.keys(jsonTests.trietest);

    testNames.forEach((name) => {
      it(name, async () => {
        await Promise.all(
          jsonTests.trietest[name].in.map((input) =>
            trie.put(toU8a(input[0]), toU8a(input[1]))
          )
        );

        expect(
          u8aToHex(trie.root)
        ).toEqual(
          jsonTests.trietest[name].root
        );
      });
    });
  });

  describe('unordered tests', () => {
    const testNames = Object.keys(jsonTests.trieanyorder);

    testNames.forEach((name) => {
      const test = jsonTests.trieanyorder[name];
      const keys = Object.keys(test.in);

      it(name, async () => {
        await Promise.all(
          keys.map((key) =>
            trie.put(toU8a(key), toU8a(test.in[key]))
          )
        );

        expect(
          u8aToHex(trie.root)
        ).toEqual(
          test.root
        );
      });
    });
  });
});
