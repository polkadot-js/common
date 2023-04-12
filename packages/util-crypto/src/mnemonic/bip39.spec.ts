// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import * as lists from './bip39-lang/index.js';
import { entropyToMnemonic, mnemonicToEntropy } from './bip39.js';

describe('wordlists', (): void => {
  for (const [k, v] of Object.entries(lists)) {
    describe(`language ${k}`, (): void => {
      it('has the correct number of words', (): void => {
        expect(v).toHaveLength(2048);
      });

      it('has no empty words', (): void => {
        expect(v.some((n) => !n.length || n.trim() !== n)).toEqual(false);
      });
    });
  }
});

describe('bip39', (): void => {
  it('has a two-way entropy <-> mnemonic', (): void => {
    const m = 'seed sock milk update focus rotate barely fade car face mechanic mercy';

    expect(
      entropyToMnemonic(mnemonicToEntropy(m))
    ).toEqual(m);
  });
});
