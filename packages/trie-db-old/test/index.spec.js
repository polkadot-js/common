// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import u8aToHex from '@polkadot/util/u8a/toHex';
import toU8a from '@polkadot/util/u8a/toU8a';

import Trie from '../src/index';

describe('simple save and retrive', () => {
  it('should not crash if given a non-existant root', async () => {
    const root = toU8a('0x3f4399b08efe68945c1cf90ffe85bbe3ce978959da753f9e649f034015b8817d');
    const trie = new Trie(null, root);
    const value = await trie.get(toU8a('test'));

    expect(value).toEqual(null);
  });

  var trie = new Trie();

  it('starts with a valid root', () => {
    expect(
      trie.root
    ).toEqual(
      new Uint8Array([
        86, 232, 31, 23, 27, 204, 85, 166, 255, 131, 69, 230, 146, 192, 248, 110, 91, 72, 224, 27, 153, 108, 173, 192, 1, 98, 47, 181, 227, 99, 180, 33
      ])
    )
  });

  it('save a value', async () => {
    await trie.put(toU8a('test'), toU8a('one'));

    expect(
      trie.root
    ).toEqual(
      new Uint8Array([
        43, 119, 232, 84, 123, 197, 94, 42, 149, 34, 124, 147, 159, 159, 157, 103, 149, 45, 225, 233, 112, 160, 23, 224, 145, 11, 229, 16, 176, 144, 175, 243
      ])
    );
  });

  it('should get a value', async () => {
    const value = await trie.get(toU8a('test'));

    expect(value).toEqual(toU8a('one'));
  });

  it('should update a value', async () => {
    await trie.put(toU8a('test'), toU8a('two'));

    const value = await trie.get(toU8a('test'));

    expect(value).toEqual(toU8a('two'));
    expect(trie.root).toEqual(new Uint8Array([127, 237, 74, 184, 190, 46, 103, 129, 65, 141, 13, 96, 61, 232, 146, 13, 56, 32, 59, 29, 246, 58, 175, 140, 72, 182, 196, 103, 230, 245, 229, 148]));
  });

  it('should delete a value', async () => {
    await trie.del(toU8a('test'));

    const value = await trie.get(toU8a('test'));

    expect(value).toEqual(null);
    expect(trie.root).toEqual(new Uint8Array([86, 232, 31, 23, 27, 204, 85, 166, 255, 131, 69, 230, 146, 192, 248, 110, 91, 72, 224, 27, 153, 108, 173, 192, 1, 98, 47, 181, 227, 99, 180, 33]));
  });

  it('should recreate a value', async () => {
    await trie.put(toU8a('test'), toU8a('one'));

    expect(trie.root).toEqual(new Uint8Array([43, 119, 232, 84, 123, 197, 94, 42, 149, 34, 124, 147, 159, 159, 157, 103, 149, 45, 225, 233, 112, 160, 23, 224, 145, 11, 229, 16, 176, 144, 175, 243]));
  });

  it('should get updated a value', async () => {
    const value = await trie.get(toU8a('test'));

    expect(value).toEqual(toU8a('one'));
  });

  it('should create a branch here', async () => {
    await trie.put(toU8a('doge'), toU8a('coin'));

    expect(
      toU8a('0xde8a34a8c1d558682eae1528b47523a483dd8685d6db14b291451a66066bf0fc')
    ).toEqual(trie.root);
  });

  it('should get a value that is in a branch', async () => {
    const value = await trie.get(toU8a('doge'));

    expect(value).toEqual(toU8a('coin'));
  });

  it('should delete from a branch', async () => {
    await trie.del(toU8a('doge'));

    const value = await trie.get(toU8a('doge'));

    expect(value).toEqual(null);
    expect(trie.root).toEqual(new Uint8Array([43, 119, 232, 84, 123, 197, 94, 42, 149, 34, 124, 147, 159, 159, 157, 103, 149, 45, 225, 233, 112, 160, 23, 224, 145, 11, 229, 16, 176, 144, 175, 243]));
  });
});

describe('storing longer values', () => {
  const trie = new Trie();
  const longString = 'this will be a really really really long value';
  const longStringRoot = '0xb173e2db29e79c78963cff5196f8a983fbe0171388972106b114ef7f5c24dfa3';

  it('should store a longer string', async () => {
    await trie.put(toU8a('done'), toU8a(longString));

    expect(trie.root).toEqual(new Uint8Array([79, 170, 48, 228, 218, 25, 91, 13, 86, 114, 153, 98, 252, 127, 54, 124, 242, 163, 153, 215, 249, 196, 65, 209, 186, 130, 39, 6, 181, 246, 231, 111]));
  });

  it('stores subsequent values', async () => {
    await trie.put(toU8a('doge'), toU8a('coin'));

    expect(longStringRoot).toEqual(u8aToHex(trie.root));
  });

  it('should retreive a longer value', async () => {
    const value = await trie.get(toU8a('done'));

    expect(value).toEqual(toU8a(longString));
  });

  it('should when being modiefied delete the old value', async () => {
    await trie.put(toU8a('done'), toU8a('test'));

    expect(trie.root).toEqual(new Uint8Array([
      219, 23, 9, 241, 116, 187, 56, 113, 244, 253, 200, 19, 242, 27, 188, 158, 217, 68, 67, 249, 222, 154, 243, 190, 184, 56, 173, 54, 214, 42, 91, 206
    ]));
  });
});

describe('testing Extentions and branches', () => {
  const trie = new Trie();

  it('should store a value', async () => {
    await trie.put(toU8a('doge'), toU8a('coin'));
  });

  it('should create extention to store this value', async () => {
    await trie.put(toU8a('do'), toU8a('verb'));

    expect(
      toU8a('0xf803dfcb7e8f1afd45e88eedb4699a7138d6c07b71243d9ae9bff720c99925f9')
    ).toEqual(trie.root);
  });

  it('should store this value under the extention ', async () => {
    await trie.put(toU8a('done'), toU8a('finished'));

    expect(
      '0x409cff4d820b394ed3fb1cd4497bdd19ffa68d30ae34157337a7043c94a3e8cb'
    ).toEqual(u8aToHex(trie.root));
  });
});

describe('testing Extentions and branches - reverse', () => {
  const trie = new Trie();

  it('should create extention to store this value', async () => {
    await trie.put(toU8a('do'), toU8a('verb'));

    const value = await trie.get(toU8a('do'));

    expect(value).toEqual(toU8a('verb'));
  });

  it('should store a value', async () => {
    await trie.put(toU8a('doge'), toU8a('coin'));
  });

  it('should store this value under the extention ', async () => {
    await trie.put(toU8a('done'), toU8a('finished'));

    expect(
      '0x409cff4d820b394ed3fb1cd4497bdd19ffa68d30ae34157337a7043c94a3e8cb'
    ).toEqual(u8aToHex(trie.root));
  });
});

describe('testing deletions cases', () => {
  const trie = new Trie();

  it('should delete from a branch->branch-branch', async () => {
    await Promise.all([
      trie.put(new Uint8Array([11, 11, 11]), toU8a('first')),
      trie.put(new Uint8Array([12, 22, 22]), toU8a('create the first branch')),
      trie.put(new Uint8Array([12, 34, 44]), toU8a('create the last branch'))
    ]);
    await trie.del(new Uint8Array([12, 22, 22]));

    const value = await trie.get(new Uint8Array([12, 22, 22]));

    expect(null).toEqual(value);
  });

  it('should delete from a branch->branch-extention', async () => {
    await Promise.all([
      trie.put(new Uint8Array([11, 11, 11]), toU8a('first')),
      trie.put(new Uint8Array([12, 22, 22]), toU8a('create the first branch')),
      trie.put(new Uint8Array([12, 33, 33]), toU8a('create the middle branch')),
      trie.put(new Uint8Array([12, 33, 44]), toU8a('create the last branch'))
    ]);
    await trie.del(new Uint8Array([12, 22, 22]));

    const value = await trie.get(new Uint8Array([12, 22, 22]));

    expect(null).toEqual(value);
  });

  it('should delete from a extention->branch-extention', async () => {
    await trie.put(new Uint8Array([11, 11, 11]), toU8a('first'));
    await trie.put(new Uint8Array([12, 22, 22]), toU8a('create the first branch'));
    await trie.put(new Uint8Array([12, 33, 33]), toU8a('create the middle branch'));
    await trie.put(new Uint8Array([12, 33, 44]), toU8a('create the last branch'));
    await trie.del(new Uint8Array([11, 11, 11]));

    const value = await trie.get(new Uint8Array([11, 11, 11]));

    expect(null).toEqual(value);
  });

  it('should delete from a extention->branch-branch', async () => {
    await trie.put(new Uint8Array([11, 11, 11]), toU8a('first'));
    await trie.put(new Uint8Array([12, 22, 22]), toU8a('create the first branch'));
    await trie.put(new Uint8Array([12, 33, 33]), toU8a('create the middle branch'));
    await trie.put(new Uint8Array([12, 34, 44]), toU8a('create the last branch'));
    await trie.del(new Uint8Array([11, 11, 11]));

    const value = await trie.get(new Uint8Array([11, 11, 11]));

    expect(null).toEqual(value);
  });
});
