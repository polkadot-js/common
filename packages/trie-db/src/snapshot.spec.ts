// Copyright 2017-2019 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { trieRoot } from '@polkadot/trie-hash';
import { u8aToHex, u8aToU8a as toU8a } from '@polkadot/util';

import Trie from '.';

describe('snapshots', () => {
  let trie: Trie;
  let back: Trie;

  beforeEach(() => {
    trie = new Trie();
    back = new Trie();
  });

  it('creates a snapshot of the (relevant) trie data', () => {
    const values = [
      { k: toU8a('test'), v: toU8a('one') }
    ];
    const root = trieRoot(values);

    trie.put(values[0].k, values[0].v);
    trie.put(values[0].k, toU8a('two'));
    trie.del(values[0].k);
    trie.put(values[0].k, values[0].v);
    trie.put(toU8a('doge'), toU8a('coin'));
    trie.del(toU8a('doge'));

    trie.snapshot(back, () => void 0);

    expect(u8aToHex(back.getRoot())).toEqual(u8aToHex(root));
    expect(trie.get(values[0].k)).toEqual(values[0].v);
  });

  it('creates a snapshot of the (relevant) data', () => {
    const values = [
      { k: toU8a('one'), v: toU8a('testing') },
      { k: toU8a('two'), v: toU8a('testing with a much longer value here') },
      { k: toU8a('twzei'), v: toU8a('und Deutch') },
      { k: toU8a('do'), v: toU8a('do it') },
      { k: toU8a('dog'), v: toU8a('doggie') },
      { k: toU8a('dogge'), v: toU8a('bigger dog') },
      { k: toU8a('dodge'), v: toU8a('coin') }
    ];
    const root = trieRoot(values);

    values.forEach(({ k, v }) =>
      trie.put(k, v)
    );
    trie.snapshot(back, () => void 0);

    expect(u8aToHex(back.getRoot())).toEqual(u8aToHex(root));
    values.forEach(({ k, v }) =>
      expect(trie.get(k)).toEqual(v)
    );
  });
});
