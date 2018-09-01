// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import u8aToHex from '@polkadot/util/u8a/toHex';
import toU8a from '@polkadot/util/u8a/toU8a';

import Trie from '../src/index';

const EMPTY_ROOT = '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421';
const HELLO_ROOT = '0x0a915659b88f80bfa200570bd2767a6ab8cb0a4e44fd240cc5ed7a27728c4531';
const FOO_ROOT = '0xed4e32371288ee83be74f78fb492f01261b7c3dc9c422581bb705c4376492dc6';

describe('@polkadot refactoring', () => {
  const trie = new Trie();

  it('has the correct starting trieroot', () => {
    expect(
      u8aToHex(trie.root)
    ).toEqual(
      EMPTY_ROOT
    );
  });

  it('has the correct root after a single insertion', async () => {
    await trie.put(toU8a('hello'), toU8a('world'));

    expect(
      u8aToHex(trie.root)
    ).toEqual(
      HELLO_ROOT
    );
  });

  it('has the correct root after a deletion', async () => {
    await trie.del(toU8a('hello'));

    expect(
      u8aToHex(trie.root)
    ).toEqual(
      EMPTY_ROOT
    );
  });

  it('has the correct root after a re-insertion', async () => {
    await trie.put(toU8a('hello'), toU8a('world'));

    expect(
      u8aToHex(trie.root)
    ).toEqual(
      HELLO_ROOT
    );
  });

  it('has the correct root after a second insertion', async () => {
    await trie.put(toU8a('foo'), toU8a('bar'));

    expect(
      u8aToHex(trie.root)
    ).toEqual(
      FOO_ROOT
    );
  });

  it('has the correct root after a re-deletion', async () => {
    await trie.del(toU8a('hello'));

    expect(
      u8aToHex(trie.root)
    ).toEqual(
      '0x99650c730bbb99f6f58ce8b09bca2a8d90b36ac662e71bf81ec401ed23d199fb'
    );
  });

  it('has the correct root after a re-re-insertion', async () => {
    await trie.put(toU8a('hello'), toU8a('world'));

    expect(
      u8aToHex(trie.root)
    ).toEqual(
      FOO_ROOT
    );
  });

  it('has the correct root after an update', async () => {
    await trie.put(toU8a('hello'), toU8a('mars'));

    expect(
      u8aToHex(trie.root)
    ).toEqual(
      '0x116267e482ab94eb8824af425ea7f20ee84d10a8fa735f26204d80000e2a907e'
    );
  });
});
