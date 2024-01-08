// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { u8aToHex } from '@polkadot/util';

import { hdLedger } from '../index.js';

const MNE_0 = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about';
const MNE_1 = 'open jelly jeans corn ketchup supreme brief element armed lens vault weather original scissors rug priority vicious lesson raven spot gossip powder person volcano';
const MNE_P = `${MNE_1} testing`;

const TESTS = {
  Kusama: {
    slip44: 0x01b2,
    tests: [
      {
        ed25519: '0x98cb4e14e0e08ea876f88d728545ea7572dc07dbbe69f1731c418fb827e69d41',
        index: [0, 0],
        mnemonic: MNE_0
      },
      {
        ed25519: '0x70e9010e84c81095aaa5f63b1c5a6a66a1dcbec017a23c2f3b7a1b08fe5ea65a',
        index: [0, 0],
        mnemonic: MNE_1
      },
      {
        ed25519: '0xf06730efb1e6ea59ac752a7c3620fade3909062fb88597856cc3af72045fa65a',
        index: [5, 7],
        mnemonic: MNE_1
      }
    ]
  },
  Polkadot: {
    slip44: 0x0162,
    tests: [
      {
        ed25519: '0xe8c68348586d53e4e8d1a864b0e4e17c75e4eb06e0c63c1432bef2ba29e69d41',
        index: [0, 0],
        mnemonic: MNE_0
      },
      {
        ed25519: '0x3890e8db837eba3f8f25215c753e1091062298ce671a51441e7ef89a7adc4f48',
        index: [0, 0],
        mnemonic: MNE_P
      }
    ]
  }
};

describe('ledgerDerive', (): void => {
  Object.entries(TESTS).forEach(([network, { slip44, tests }]): void => {
    tests.forEach(({ ed25519, index: [account, address], mnemonic }, index): void => {
      it(`derives a known ed25519 seed for ${network} (${index})`, (): void => {
        expect(u8aToHex(
          hdLedger(mnemonic, `m/44'/${slip44}'/${account}'/0'/${address}'`)
            .secretKey
            .slice(0, 32)
        )).toEqual(ed25519);
      });
    });
  });
});
