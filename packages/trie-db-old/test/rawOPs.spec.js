// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import randomAsU8a from '@polkadot/util-crypto/random/asU8a';

import Trie from '../src/index';

describe('put & get raw functions', () => {
  var trie = new Trie();
  var key = randomAsU8a(32);
  var val = randomAsU8a(32);

  it('putRaw', async () => {
    await trie.putRaw(key, val);
  });

  it('getRaw', async () => {
    const rVal = await trie.getRaw(key);

    expect(rVal).toEqual(val);
  });

  it('should checkpoint and get the rawVal', async () => {
    await trie.checkpoint();

    const rVal = await trie.getRaw(key);

    expect(rVal).toEqual(val);
  });

  var key2 = randomAsU8a(32);
  var val2 = randomAsU8a(32);

  it('should store while in a checkpoint', async () => {
    await trie.putRaw(key2, val2);
  });

  it('should retrieve from a checkpoint', async () => {
    const rVal = await trie.getRaw(key2);

    expect(rVal).toEqual(val2);
  });

  it('should not retieve after revert', async () => {
    await trie.revert();
  });

  it('should delete raw', async () => {
    await trie.delRaw(val2);
  });

  it('should not get val after delete ', async () => {
    const rVal = await trie.getRaw(val2);

    expect(rVal).not.toBeDefined();
  });

  var key3 = randomAsU8a(32);
  var val3 = randomAsU8a(32);

  it('test commit behavoir', async () => {
    await trie.checkpoint();
    await trie.putRaw(key3, val3);
    await trie.commit();

    const rVal = await trie.getRaw(key3);

    expect(rVal).toEqual(val3);
  });
});
