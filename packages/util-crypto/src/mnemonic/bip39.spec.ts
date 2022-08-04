// Copyright 2017-2022 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { entropyToMnemonic, mnemonicToEntropy } from './bip39';
import DEFAULT_WORDLIST from './bip39-en';

describe('wordlist', (): void => {
  it('has the correct number of words', (): void => {
    expect(DEFAULT_WORDLIST).toHaveLength(2048);
  });

  it('has no empty words', (): void => {
    expect(DEFAULT_WORDLIST.some((n) => !n.length || n.trim() !== n)).toEqual(false);
  });
});

describe('bip39', (): void => {
  it('has a two-way entropy <-> mnemonic', (): void => {
    const m = 'seed sock milk update focus rotate barely fade car face mechanic mercy';

    expect(
      entropyToMnemonic(mnemonicToEntropy(m))
    ).toEqual(m);
  });
});
