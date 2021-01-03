// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { cryptoWaitReady } from '..';
import { mnemonicGenerate, WordCount } from './generate';
import { mnemonicValidate } from './validate';

describe('mnemonicGenerate', (): void => {
  beforeEach(async (): Promise<void> => {
    await cryptoWaitReady();
  });

  it('generates a valid mnemonic (default strength)', (): void => {
    expect(
      mnemonicValidate(mnemonicGenerate())
    ).toEqual(true);
  });

  [false, true].forEach((onlyJs): void => {
    ([12, 15, 18, 21, 24] as WordCount[]).forEach((num: WordCount): void => {
      it(`generates a valid mnemonic (${num} words, onlyJs=${onlyJs.toString()})`, (): void => {
        const mnemonic = mnemonicGenerate(num, onlyJs);
        const isValid = mnemonicValidate(mnemonic);

        expect(mnemonic.split(' ')).toHaveLength(num);
        expect(isValid).toEqual(true);
      });
    });
  });

  [true, false].forEach((onlyJs): void => {
    it(`generates not deterministic (onlyJs=${onlyJs.toString()})`, (): void => {
      const m1 = mnemonicGenerate(24, onlyJs);
      const m2 = mnemonicGenerate(24, onlyJs);

      expect(m1 === m2).toEqual(false);
      expect(mnemonicValidate(m1)).toEqual(true);
      expect(mnemonicValidate(m2)).toEqual(true);
    });
  });
});
