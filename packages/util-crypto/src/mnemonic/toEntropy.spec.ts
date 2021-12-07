// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToHex } from '@polkadot/util';

import tests from '../sr25519/pair/testing.spec';
import { cryptoWaitReady } from '..';
import { mnemonicToEntropy } from './toEntropy';

describe('mnemonicToEntropy', (): void => {
  beforeEach(async (): Promise<void> => {
    await cryptoWaitReady();
  });

  describe.each([false, true])('onlyJs=%p', (onlyJs): void => {
    tests.forEach(([mnemonic, entropy], index): void => {
      it(`Created correct entropy for ${index}`, (): void => {
        expect(u8aToHex(mnemonicToEntropy(mnemonic, onlyJs))).toEqual(entropy);
      });
    });
  });
});
