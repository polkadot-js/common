// Copyright 2017-2022 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { supportedApps } from '@zondax/ledger-substrate/dist/supported_apps';

import { ledgerApps } from './defaults';

describe('ledgerApps', (): void => {
  it.each(Object.keys(ledgerApps))('%s is known', (k): void => {
    expect(
      supportedApps.find(({ name }) =>
        name === ledgerApps[k]
      )
    ).toBeDefined();
  });
});
