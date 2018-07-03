// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import toU8a from '@polkadot/util/u8a/toU8a';

import Trie from '../src/Trie';

describe('testing checkpoints', () => {
  let trie, preRoot, postRoot;

  it('sets up the trie', async () => {
    trie = new Trie();

    await trie.put(toU8a('do'), toU8a('verb'));
    await trie.put(toU8a('doge'), toU8a('coin'));

    preRoot = trie.root;
  });

  it('should create a checkpoint', async () => {
    await trie.checkpoint();
  });

  it('should save to the cache', async () => {
    await trie.put(toU8a('test'), toU8a('something'));
    await trie.put(toU8a('love'), toU8a('emotion'));

    postRoot = trie.root;
  });

  it('should revert to the orginal root', async () => {
    expect(trie.isCheckpoint).toEqual(true);

    await trie.revert();

    expect(trie.root).toEqual(preRoot);
    expect(trie.isCheckpoint).toEqual(false);
  });

  it('should commit a checkpoint', async () => {
    await trie.checkpoint();
    await trie.put(toU8a('test'), toU8a('something'));
    await trie.put(toU8a('love'), toU8a('emotion'));
    await trie.commit();

    expect(trie.isCheckpoint).toEqual(false);
    expect(trie.root).toEqual(postRoot);
  });

  it('should commit a nested checkpoint', async () => {
    await trie.checkpoint();
    await trie.put(toU8a('test'), toU8a('something else'));

    const root = trie.root;

    await trie.checkpoint();
    await trie.put(toU8a('the feels'), toU8a('emotion'));
    await trie.revert();
    await trie.commit();

    expect(trie.isCheckpoint).toEqual(false);
    expect(trie.root).toEqual(root);
  });
});
