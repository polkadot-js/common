// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import u8aToHex from '@polkadot/util/u8a/toHex';
import toU8a from '@polkadot/util/u8a/toU8a';
import keccakAsU8a from '@polkadot/util-crypto/keccak/asU8a';
import encodeRlp from '@polkadot/util-rlp/encode';

import Trie from '../src/Trie';

describe('it should create the genesis state root from ethereum', () => {
  const trie4 = new Trie();
  const g = toU8a('0x8a40bfaa73256b60764c1bf40675a99083efb075');
  const j = toU8a('0xe6716f9544a56c530d868e4bfbacb172315bdead');
  const v = toU8a('0x1e12515ce3e0f817a4ddef9ca55788a1d66bd2df');
  const a = toU8a('0x1a26338f0d905e295fccb71fa9ea849ffa12aaf4');
  const stateRoot = new Uint8Array(32);
  const startAmount = new Uint8Array(26);

  startAmount[0] = 1;

  const account = [startAmount, 0, stateRoot, keccakAsU8a(new Uint8Array())];
  const genesisStateRoot = '0x2f4399b08efe68945c1cf90ffe85bbe3ce978959da753f9e649f034015b8817d';
  const cppRlp = '0xf85e9a010000000000000000000000000000000000000000000000000080a00000000000000000000000000000000000000000000000000000000000000000a0c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
  const rlpAccount = encodeRlp(account);

  it('matches the initial rlp', () => {
    expect(cppRlp).toEqual(u8aToHex(rlpAccount));
  });

  it('shall match the root', async () => {
    await trie4.put(g, rlpAccount);
    await trie4.put(j, rlpAccount);
    await trie4.put(v, rlpAccount);
    await trie4.put(a, rlpAccount);

    expect(u8aToHex(trie4.root)).toEqual(genesisStateRoot);
  });
});
