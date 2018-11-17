// Copyright 2017-2018 @polkadot/trie-root authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import trieRoot from './trieRoot';
import tests from './testdata';

describe('trieRoot', () => {
  tests.forEach(({ name, input, root }) => {
    it(`hashes ${name}`, () => {
      expect(trieRoot(input)).toEqual(root);
    });
  });
});
