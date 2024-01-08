// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { cryptoWaitReady } from '../index.js';
import { french as frenchWords } from './wordlists/index.js';
import { mnemonicValidate } from './validate.js';

await cryptoWaitReady();

describe('mnemonicValidate', (): void => {
  for (const onlyJs of [undefined, true]) {
    describe(`onlyJs=${(onlyJs && 'true') || 'false'}`, (): void => {
      it('returns true on valid', (): void => {
        expect(
          mnemonicValidate('seed sock milk update focus rotate barely fade car face mechanic mercy', undefined, onlyJs)
        ).toEqual(true);
      });

      it('returns false on invalid', (): void => {
        expect(
          mnemonicValidate('wine photo extra cushion basket dwarf humor cloud truck job boat submit', undefined, onlyJs)
        ).toEqual(false);
      });
    });
  }

  it('allows usage of a different wordlist', (): void => {
    const mnemonic = 'pompier circuler pulpe injure aspect abyssal nuque boueux équerre balisage pieuvre médecin petit suffixe soleil cumuler monstre arlequin liasse pixel garrigue noble buisson scandale';

    expect(
      mnemonicValidate(mnemonic, frenchWords)
    ).toEqual(true);
    expect(
      mnemonicValidate(mnemonic)
    ).toEqual(false);
  });
});
