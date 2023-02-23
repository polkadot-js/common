// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToHex } from '@polkadot/util';

import tests from '../sr25519/pair/testing.spec';
import { cryptoWaitReady } from '..';
import { mnemonicToEntropy } from './toEntropy';

describe('mnemonicToEntropy', (): void => {
  beforeEach(async (): Promise<void> => {
    await cryptoWaitReady();
  });

  for (const onlyJs of [false, true]) {
    describe(`onlyJs=${(onlyJs && 'true') || 'false'}`, (): void => {
      tests.forEach(([mnemonic, entropy], index): void => {
        it(`Created correct entropy for ${index}`, (): void => {
          expect(u8aToHex(mnemonicToEntropy(mnemonic, onlyJs))).toEqual(entropy);
        });
      });
    });
  }
});
