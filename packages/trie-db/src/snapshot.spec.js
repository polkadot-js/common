// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import toU8a from '@polkadot/util/u8a/toU8a';

import Trie from './index';

describe('snapshots', () => {
  it('creates a snapshot of the (relevant) trie data', () => {
    const root = new Uint8Array([43, 119, 232, 84, 123, 197, 94, 42, 149, 34, 124, 147, 159, 159, 157, 103, 149, 45, 225, 233, 112, 160, 23, 224, 145, 11, 229, 16, 176, 144, 175, 243]);
    const trie = new Trie();
    const back = new Trie();

    trie.put(toU8a('test'), toU8a('one'));
    trie.put(toU8a('test'), toU8a('two'));
    trie.del(toU8a('test'));
    trie.put(toU8a('test'), toU8a('one'));
    trie.put(toU8a('doge'), toU8a('coin'));
    trie.del(toU8a('doge'));

    trie.snapshot(back, () => {});

    expect(back.getRoot()).toEqual(root);
    expect(trie.get(toU8a('test'))).toEqual(toU8a('one'));
  });

  it('creates a snapshot of the (relevant) data', () => {
    const root = new Uint8Array([124, 157, 64, 253, 245, 26, 3, 63, 210, 140, 4, 56, 214, 180, 147, 0, 167, 60, 113, 206, 171, 136, 88, 84, 139, 142, 230, 40, 42, 113, 21, 242]);
    const trie = new Trie();
    const back = new Trie();

    trie.put(toU8a('one'), toU8a('testing'));
    trie.put(toU8a('two'), toU8a('testing with a much longer value here'));
    trie.put(toU8a('twzei'), toU8a('und Deutch'));
    trie.put(toU8a('do'), toU8a('do it'));
    trie.put(toU8a('dog'), toU8a('doggie'));
    trie.put(toU8a('dogge'), toU8a('bigger dog'));
    trie.put(toU8a('dodge'), toU8a('coin'));

    trie.snapshot(back, () => {});

    expect(back.getRoot()).toEqual(root);
    expect(back.get(toU8a('one'))).toEqual(toU8a('testing'));
    expect(back.get(toU8a('two'))).toEqual(toU8a('testing with a much longer value here'));
    expect(back.get(toU8a('twzei'))).toEqual(toU8a('und Deutch'));
    expect(back.get(toU8a('do'))).toEqual(toU8a('do it'));
    expect(back.get(toU8a('dog'))).toEqual(toU8a('doggie'));
    expect(back.get(toU8a('dogge'))).toEqual(toU8a('bigger dog'));
    expect(back.get(toU8a('dodge'))).toEqual(toU8a('coin'));
  });
});
