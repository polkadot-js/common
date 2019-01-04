// Copyright 2017-2019 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aToHex } from '@polkadot/util/index';

import trieRoot from './trieRoot';
import testdata from '../test/data';

describe('trieRoot', () => {
  Object.values(testdata).forEach(({ desc, input, root }) => {
    it(`hashes ${desc}`, () => {
      expect(
        u8aToHex(trieRoot(input))
      ).toEqual(
        u8aToHex(root)
      );
    });
  });
});
