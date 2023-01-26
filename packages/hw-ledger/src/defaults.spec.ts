// Copyright 2017-2023 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { supportedApps } from '@zondax/ledger-substrate';

import { ledgerApps } from './defaults';

describe('ledgerApps', (): void => {
  it.each(Object.keys(ledgerApps))('%s is available in @zondax/ledger-substrate', (k): void => {
    expect(
      supportedApps.find(({ name }) =>
        name === ledgerApps[k]
      )
    ).toBeDefined();
  });
});
