// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { cryptoWaitReady } from '../index.js';
import { mnemonicValidate } from './validate.js';

await cryptoWaitReady();

describe('mnemonicValidate', (): void => {
  for (const onlyJs of [undefined, true]) {
    describe(`onlyJs=${(onlyJs && 'true') || 'false'}`, (): void => {
      it('returns true on valid', (): void => {
        expect(
          mnemonicValidate('seed sock milk update focus rotate barely fade car face mechanic mercy', onlyJs)
        ).toEqual(true);
      });

      it('returns false on invalid', (): void => {
        expect(
          mnemonicValidate('wine photo extra cushion basket dwarf humor cloud truck job boat submit', onlyJs)
        ).toEqual(false);
      });
    });
  }
});
