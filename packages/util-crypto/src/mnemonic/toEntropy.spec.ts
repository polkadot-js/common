// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToHex } from '@polkadot/util';

import toEntropy from './toEntropy';
import tests from '../schnorrkel/keypair/testing';
import { cryptoWaitReady } from '..';

describe('mnemonicToEntropy', (): void => {
  beforeEach(async (): Promise<void> => {
    await cryptoWaitReady();
  });

  tests.forEach(([mnemonic, entropy], index): void => {
    it(`Created correct entropy for ${index}`, (): void => {
      expect(u8aToHex(toEntropy(mnemonic))).toEqual(entropy);
      expect(u8aToHex(toEntropy(mnemonic, true))).toEqual(entropy);
    });
  });
});
