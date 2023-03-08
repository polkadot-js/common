// Copyright 2017-2023 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { supportedApps } from '@zondax/ledger-substrate';

import { ledgerApps } from './defaults.js';

describe('ledgerApps', (): void => {
  for (const k of Object.keys(ledgerApps)) {
    it(`${k} is available in @zondax/ledger-substrate`, (): void => {
      expect(
        supportedApps.find(({ name }) =>
          name === ledgerApps[k]
        )
      ).toBeDefined();
    });
  }
});
