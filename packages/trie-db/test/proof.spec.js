// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import toU8a from '@polkadot/util/u8a/toU8a';
import u8aToUtf8 from '@polkadot/util/u8a/toUtf8';

import Trie from '../src/Trie';

describe('simple merkle proofs generation and verification', () => {
  it('create a merkle proof and verify it with a single short key', async () => {
    const trie = new Trie();

    await trie.put(toU8a('key1aa'), toU8a('01234'));

    const prove = await Trie.prove(trie, toU8a('key1aa'));
    const value = await Trie.verifyProof(trie.root, toU8a('key1aa'), prove);

    expect(u8aToUtf8(value)).toEqual('01234');
  });

  it('create a merkle proof and verify it with a single long key', async () => {
    const trie = new Trie();

    await trie.put(toU8a('key1aa'), toU8a('0123456789012345678901234567890123456789xx'));

    const prove = await Trie.prove(trie, toU8a('key1aa'));
    const value = await Trie.verifyProof(trie.root, toU8a('key1aa'), prove);

    expect(u8aToUtf8(value)).toEqual('0123456789012345678901234567890123456789xx');
  });

  it('create a merkle proof and verify it', async () => {
    const trie = new Trie();

    await trie.put(toU8a('key1aa'), toU8a('0123456789012345678901234567890123456789xx'));
    await trie.put(toU8a('key2bb'), toU8a('aval2'));
    await trie.put(toU8a('key3cc'), toU8a('aval3'));

    let prove = await Trie.prove(trie, toU8a('key2bb'));
    let value = await Trie.verifyProof(trie.root, toU8a('key2bb'), prove);

    expect(u8aToUtf8(value)).toEqual('aval2');

    prove = await Trie.prove(trie, toU8a('key1aa'));
    value = await Trie.verifyProof(trie.root, toU8a('key1aa'), prove);

    expect(u8aToUtf8(value)).toEqual('0123456789012345678901234567890123456789xx');

    prove = await Trie.prove(trie, toU8a('key2bb'));

    try {
      await Trie.verifyProof(trie.root, toU8a('randomkey'), prove);
      expect('it should').toEqual('get here');
    } catch (error) {
      expect(error).not.toEqual(null);
    }

    prove = await Trie.prove(trie, toU8a('key2bb'));

    try {
      await Trie.verifyProof(trie.root, toU8a('key2b'), prove);
      expect('it should').toEqual('get here');
    } catch (error) {
      expect(error).not.toEqual(null);
    }

    prove = await Trie.prove(trie, toU8a('key2bb'));

    prove.push(toU8a('123456'));

    try {
      await Trie.verifyProof(trie.root, toU8a('key2b'), prove);
      expect('it should').toEqual('get here');
    } catch (error) {
      expect(error).not.toEqual(null);
    }
  });

  it('create a merkle proof and verify it with keys in the midle', async () => {
    const trie = new Trie();

    await trie.put(toU8a('key1aa'), toU8a('0123456789012345678901234567890123456789xxx'));
    await trie.put(toU8a('key1'), toU8a('0123456789012345678901234567890123456789Very_Long'));
    await trie.put(toU8a('key2bb'), toU8a('aval3'));
    await trie.put(toU8a('key2'), toU8a('short'));
    await trie.put(toU8a('key3cc'), toU8a('aval3'));
    await trie.put(toU8a('key3'), toU8a('1234567890123456789012345678901'));

    let prove = await Trie.prove(trie, toU8a('key1'));
    let value = await Trie.verifyProof(trie.root, toU8a('key1'), prove);

    expect(u8aToUtf8(value)).toEqual('0123456789012345678901234567890123456789Very_Long');

    prove = await Trie.prove(trie, toU8a('key2'));
    value = await Trie.verifyProof(trie.root, toU8a('key2'), prove);

    expect(u8aToUtf8(value)).toEqual('short');

    prove = await Trie.prove(trie, toU8a('key3'));
    value = await Trie.verifyProof(trie.root, toU8a('key3'), prove);

    expect(u8aToUtf8(value)).toEqual('1234567890123456789012345678901');
  });
});
