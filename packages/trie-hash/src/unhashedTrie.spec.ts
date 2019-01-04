// Copyright 2017-2019 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aToHex } from '@polkadot/util/index';

import unhashedTrie from './unhashedTrie';
import testdata from '../test/data';

describe('unhashedTrie', () => {
  Object.values(testdata).forEach(({ desc, input, output }) => {
    it(`encodes ${desc}`, () => {
      expect(
        u8aToHex(unhashedTrie(input))
      ).toEqual(
        u8aToHex(output)
      );
    });
  });
});
