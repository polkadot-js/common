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
    expect(
      validate(generate())
    ).toEqual(true);
  });

  [false, true].forEach((onlyJs): void => {
    ([12, 15, 18, 21, 24] as WordCount[]).forEach((num: WordCount): void => {
      it(`generates a valid mnemonic (${num} words, onlyJs=${onlyJs.toString()})`, (): void => {
        const mnemonic = generate(num, onlyJs);
        const isValid = validate(mnemonic);

        expect(mnemonic.split(' ')).toHaveLength(num);
        expect(isValid).toEqual(true);
      });
    });
  });

  [true, false].forEach((onlyJs): void => {
    it(`generates not deterministic (onlyJs=${onlyJs.toString()})`, (): void => {
      [false, true].forEach((onlyJs): void => {
        const m1 = generate(24, onlyJs);
        const m2 = generate(24, onlyJs);

        expect(m1 === m2).toEqual(false);
        expect(validate(m1)).toEqual(true);
        expect(validate(m2)).toEqual(true);
      });
    });
  });
});
