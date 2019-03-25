// Copyright 2017-2019 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import mkdirp from 'mkdirp';
import path from 'path';
import rimraf from 'rimraf';
import { alexander } from '@polkadot/chainspec';
import TrieDb from '@polkadot/trie-db';
import { hexToU8a, u8aToHex } from '@polkadot/util';

import DiskDb from '../Disk';

describe.skip('DB via a trie', () => {
  const location = path.join(process.cwd(), '--test-FileFlatDb-ViaTrie');
  const { genesis: { raw }, genesisRoot } = alexander;

  beforeAll(() => {
    rimraf.sync(location);
    mkdirp.sync(location);
  });

  it('creates a trie with the correct root', () => {
    const trie = new TrieDb(new DiskDb(location, 'test.db', { isNative: true }));

    trie.open();
    trie.transaction(() => {
      Object.keys(raw).forEach((key) => {
        trie.put(hexToU8a(key), hexToU8a(raw[key]));
      });

      return true;
    });

    expect(
      u8aToHex(trie.getRoot())
    ).toEqual(genesisRoot);
  });

  describe('re-opens and has all the correct keys', () => {
    const trie = new TrieDb(new DiskDb(location, 'test.db', { isNative: true }));

    trie.open();
    trie.setRoot(hexToU8a(genesisRoot));

    Object.keys(raw).forEach((key) => {
      it(key, () => {
        expect(
          u8aToHex(trie.get(hexToU8a(key)))
        ).toEqual(raw[key]);
      });
    });
  });
});
