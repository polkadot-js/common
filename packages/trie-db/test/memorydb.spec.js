// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import toU8a from '@polkadot/util/u8a/toU8a';

import MemoryDb from '../src/Memory';

const EMPTY_ROOT = toU8a('0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421');
const HELLO_ROOT = toU8a('0x0a915659b88f80bfa200570bd2767a6ab8cb0a4e44fd240cc5ed7a27728c4531');
const FOO_ROOT = toU8a('0xed4e32371288ee83be74f78fb492f01261b7c3dc9c422581bb705c4376492dc6');

describe('MemoryDb', () => {
  let memory = new MemoryDb();

  it('starts with the default root', () => {
    expect(
      memory.trieRoot()
    ).toEqual(EMPTY_ROOT);
  });

  it('has the correct root after a single insertion', () => {
    memory.put(toU8a('hello'), toU8a('world'));

    expect(
      memory.trieRoot()
    ).toEqual(
      HELLO_ROOT
    );
  });

  it('has the correct root after a deletion', () => {
    memory.del(toU8a('hello'));

    expect(
      memory.trieRoot()
    ).toEqual(
      EMPTY_ROOT
    );
  });

  it('has the correct root after a re-insertion', () => {
    memory.put(toU8a('hello'), toU8a('world'));

    expect(
      memory.trieRoot()
    ).toEqual(
      HELLO_ROOT
    );
  });

  it('has the correct root after a second insertion', () => {
    memory.put(toU8a('foo'), toU8a('bar'));

    expect(
      memory.trieRoot()
    ).toEqual(
      FOO_ROOT
    );
  });

  it('has the correct root after a re-deletion', () => {
    memory.del(toU8a('hello'));

    expect(
      memory.trieRoot()
    ).toEqual(
      toU8a('0x99650c730bbb99f6f58ce8b09bca2a8d90b36ac662e71bf81ec401ed23d199fb')
    );
  });

  it('has the correct root after a re-re-insertion', () => {
    memory.put(toU8a('hello'), toU8a('world'));

    expect(
      memory.trieRoot()
    ).toEqual(
      FOO_ROOT
    );
  });

  it('has the correct root after an update', () => {
    memory.put(toU8a('hello'), toU8a('mars'));

    expect(
      memory.trieRoot()
    ).toEqual(
      toU8a('0x116267e482ab94eb8824af425ea7f20ee84d10a8fa735f26204d80000e2a907e')
    );
  });
});
