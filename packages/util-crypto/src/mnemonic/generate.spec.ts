// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { cryptoWaitReady } from '..';
import { mnemonicGenerate } from './generate';
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

  for (const onlyJs of [false, true]) {
    describe(`onlyJs=${(onlyJs && 'true') || 'false'}`, (): void => {
      for (const num of <const> [12, 15, 18, 21, 24]) {
        it(`generates a valid mnemonic (${num} words)`, (): void => {
          const mnemonic = mnemonicGenerate(num, onlyJs);
          const isValid = mnemonicValidate(mnemonic);

          expect(mnemonic.split(' ')).toHaveLength(num);
          expect(isValid).toEqual(true);
        });
      }

      it('generates non-deterministic', (): void => {
        const m1 = mnemonicGenerate(24, onlyJs);
        const m2 = mnemonicGenerate(24, onlyJs);

        expect(m1 === m2).toEqual(false);
        expect(mnemonicValidate(m1)).toEqual(true);
        expect(mnemonicValidate(m2)).toEqual(true);
      });
    });
  }
});
