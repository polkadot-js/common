// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToHex } from '@polkadot/util';

import tests from '../schnorrkel/keypair/testing';
import { cryptoWaitReady } from '..';
import { mnemonicToEntropy } from './toEntropy';

describe('mnemonicToEntropy', (): void => {
  beforeEach(async (): Promise<void> => {
    await cryptoWaitReady();
  });

  tests.forEach(([mnemonic, entropy], index): void => {
    [false, true].forEach((onlyJs): void => {
      it(`Created correct entropy for ${index} (onlyJs = ${onlyJs.toString()})`, (): void => {
        expect(u8aToHex(mnemonicToEntropy(mnemonic, onlyJs))).toEqual(entropy);
      });
    });
  });
});
