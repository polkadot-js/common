// Copyright 2017-2020 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { TriePair } from './types';

import { alexander, driedDanta } from '@polkadot/chainspec';
import { hexToU8a, u8aToHex } from '@polkadot/util';

import trieRoot from './trieRoot';

describe('genesis roots', (): void => {
  [alexander, driedDanta].forEach(({ genesis: { raw }, genesisRoot, name }): void => {
    it(`has the correct root for ${name}`, (): void => {
      expect(
        u8aToHex(
          trieRoot(
            Object.keys(raw).map((key): TriePair => ({
              k: hexToU8a(key),
              v: hexToU8a(raw[key])
            }))
          )
        )
      ).toEqual(genesisRoot);
    });
  });
});
