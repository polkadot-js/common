// Copyright 2017-2021 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { knownLedger } from '@polkadot/networks/defaults';

import { ledgerApps } from './defaults';

describe('defaults', (): void => {
  it('has entries for each of the apps (hwledger -> networks)', (): void => {
    expect(
      Object.keys(knownLedger).filter((network) =>
        !ledgerApps[network]
      )
    ).toEqual([]);
  });

  it('has entries for each of the apps (networks -> hwledger)', (): void => {
    expect(
      Object.keys(ledgerApps).filter((network) =>
        !knownLedger[network]
      )
    ).toEqual([]);
  });
});
