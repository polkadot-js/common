// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { u8aToHex } from '@polkadot/util';

import { cryptoWaitReady } from '../index.js';
import tests from '../sr25519/pair/testing.spec.js';
import { french as frenchWords } from './wordlists/index.js';
import { mnemonicToEntropy } from './toEntropy.js';

await cryptoWaitReady();

describe('mnemonicToEntropy', (): void => {
  for (const onlyJs of [false, true]) {
    describe(`onlyJs=${(onlyJs && 'true') || 'false'}`, (): void => {
      tests.forEach(([mnemonic, entropy], index): void => {
        it(`Created correct entropy for ${index}`, (): void => {
          expect(u8aToHex(mnemonicToEntropy(mnemonic, undefined, onlyJs))).toEqual(entropy);
        });
      });
    });
  }

  it('has the correct entropy for non-Englist mnemonics', (): void => {
    const mnemonic = 'pompier circuler pulpe injure aspect abyssal nuque boueux équerre balisage pieuvre médecin petit suffixe soleil cumuler monstre arlequin liasse pixel garrigue noble buisson scandale';

    expect(
      () => mnemonicToEntropy(mnemonic)
    ).toThrow();
    expect(
      mnemonicToEntropy(mnemonic, frenchWords)
    ).toEqual(new Uint8Array([189, 230, 55, 17, 65, 33, 40, 4, 106, 9, 11, 88, 227, 26, 229, 76, 59, 123, 200, 55, 177, 232, 158, 66, 34, 54, 93, 54, 255, 74, 137, 70]));
  });
});
