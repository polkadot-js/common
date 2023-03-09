// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { u8aToHex } from '@polkadot/util';

import { cryptoWaitReady } from '../index.js';
import tests from '../sr25519/pair/testing.spec.js';
import { mnemonicToEntropy } from './toEntropy.js';

await cryptoWaitReady();

describe('mnemonicToEntropy', (): void => {
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
