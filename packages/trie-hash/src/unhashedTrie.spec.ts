// Copyright 2017-2020 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aToHex } from '@polkadot/util';

import unhashedTrie from './unhashedTrie';
import testdata from '../test/data';

describe('unhashedTrie', (): void => {
  Object.values(testdata).forEach(({ desc, input, output }): void => {
    it(`encodes ${desc}`, (): void => {
      expect(
        u8aToHex(unhashedTrie(input))
      ).toEqual(
        u8aToHex(output)
      );
    });
  });
});
