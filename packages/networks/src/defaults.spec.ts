// Copyright 2017-2021 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { knownGenesis, knownIcon, knownLedger } from './defaults';

describe('defaults', (): void => {
  it('has genesis for all Ledger chains', (): void => {
    expect(
      knownLedger.filter(({ network }) =>
        !knownGenesis.some((g) => g.network === network)
      )
    ).toEqual([]);
  });

  it('has known icon types for overrides', (): void => {
    expect(
      knownIcon.filter(({ icon }) =>
        !['beachball', 'empty', 'jdenticon', 'polkadot', 'substrate'].includes(icon)
      )
    ).toEqual([]);
  });
});
