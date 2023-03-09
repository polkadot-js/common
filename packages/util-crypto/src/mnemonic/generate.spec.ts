// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { cryptoWaitReady } from '../index.js';
import { mnemonicGenerate } from './generate.js';
import { mnemonicValidate } from './validate.js';

await cryptoWaitReady();

describe('mnemonicGenerate', (): void => {
  it('generates a valid mnemonic (default strength)', (): void => {
    expect(
      mnemonicValidate(mnemonicGenerate())
    ).toEqual(true);
  });

  for (const onlyJs of [false, true]) {
    describe(`onlyJs=${(onlyJs && 'true') || 'false'}`, (): void => {
      for (const num of [12, 15, 18, 21, 24] as const) {
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
