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

  describe.each([false, true])('onlyJs=%p', (onlyJs): void => {
    it.each([12, 15, 18, 21, 24] as WordCount[])('generates a valid mnemonic (%p words)', (num): void => {
      const mnemonic = mnemonicGenerate(num, onlyJs);
      const isValid = mnemonicValidate(mnemonic);

      expect(mnemonic.split(' ')).toHaveLength(num);
      expect(isValid).toEqual(true);
    });

    it('generates not deterministic', (): void => {
      const m1 = mnemonicGenerate(24, onlyJs);
      const m2 = mnemonicGenerate(24, onlyJs);

      expect(m1 === m2).toEqual(false);
      expect(mnemonicValidate(m1)).toEqual(true);
      expect(mnemonicValidate(m2)).toEqual(true);
    });
  });
});
