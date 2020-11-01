// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import validate from './validate';
import { cryptoWaitReady } from '..';

describe('mnemonicValidate', (): void => {
  beforeEach(async (): Promise<void> => {
    await cryptoWaitReady();
  });

  it('returns true on valid', (): void => {
    expect(
      validate('seed sock milk update focus rotate barely fade car face mechanic mercy')
    ).toEqual(true);
    expect(
      validate('seed sock milk update focus rotate barely fade car face mechanic mercy', true)
    ).toEqual(true);
  });

  it('returns false on invalid', (): void => {
    expect(
      validate('wine photo extra cushion basket dwarf humor cloud truck job boat submit')
    ).toEqual(false);
    expect(
      validate('wine photo extra cushion basket dwarf humor cloud truck job boat submit', true)
    ).toEqual(false);
  });
});
