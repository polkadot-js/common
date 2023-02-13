// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { cryptoWaitReady } from '..';
import { mnemonicValidate } from './validate';

await cryptoWaitReady();

describe('mnemonicValidate', (): void => {
  it('returns true on valid', (): void => {
    expect(
      mnemonicValidate('seed sock milk update focus rotate barely fade car face mechanic mercy')
    ).toEqual(true);
    expect(
      mnemonicValidate('seed sock milk update focus rotate barely fade car face mechanic mercy', true)
    ).toEqual(true);
  });

  it('returns false on invalid', (): void => {
    expect(
      mnemonicValidate('wine photo extra cushion basket dwarf humor cloud truck job boat submit')
    ).toEqual(false);
    expect(
      mnemonicValidate('wine photo extra cushion basket dwarf humor cloud truck job boat submit', true)
    ).toEqual(false);
  });
});
