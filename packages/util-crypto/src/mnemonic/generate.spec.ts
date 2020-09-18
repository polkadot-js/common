// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import generate, { WordCount } from './generate';
import validate from './validate';
import { cryptoWaitReady } from '..';

describe('mnemonicGenerate', (): void => {
  beforeEach(async (): Promise<void> => {
    await cryptoWaitReady();
  });

  it('generates a valid mnemonic (default strength)', (): void => {
    const mnemonic = generate();

    console.error(mnemonic);

    expect(
      validate(mnemonic)
    ).toEqual(true);
  });

  ([12, 15, 18, 21, 24] as WordCount[]).forEach((num: WordCount): void => {
    it(`generates a valid mnemonic (${num} words)`, (): void => {
      const mnemonic = generate(num);
      const isValid = validate(mnemonic);

      console.error(mnemonic);

      expect(mnemonic.split(' ')).toHaveLength(num);
      expect(isValid).toEqual(true);
    });
  });
});
