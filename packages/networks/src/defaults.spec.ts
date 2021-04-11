// Copyright 2017-2021 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { knownGenesis, knownLedger } from './defaults';

describe('defaults', (): void => {
  it('has genesis for all Ledger chains', (): void => {
    expect(
      Object.keys(knownLedger).filter((network) =>
        !knownGenesis[network]
      )
    ).toEqual([]);
  });
});
