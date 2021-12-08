// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import DEFAULT_WORDLIST from './bip39-en';

describe('wordlist', (): void => {
  it('has the correct number of words', (): void => {
    expect(DEFAULT_WORDLIST).toHaveLength(2048);
  });

  it('has no empty words', (): void => {
    expect(DEFAULT_WORDLIST.some((n) => !n.length || n.trim() !== n)).toEqual(false);
  });
});
