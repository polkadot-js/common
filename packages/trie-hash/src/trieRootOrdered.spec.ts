// Copyright 2017-2020 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { stringToU8a, u8aToHex } from '@polkadot/util';

import { trieRootOrdered } from '.';

describe('trieRootOrdered', (): void => {
  it('encodes values', (): void => {
    expect(
      u8aToHex(
        trieRootOrdered([
          stringToU8a('doe'),
          stringToU8a('reindeer')
        ])
      )
    ).toEqual('0xb9b1bb07e481f0393e15f32f34abd665f7a698786a7ec9feb31b2e8927ad5f86');
  });
});
