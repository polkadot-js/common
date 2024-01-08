// Copyright 2017-2024 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { ledgerApps } from '@polkadot/hw-ledger/defaults';
import { isHex } from '@polkadot/util';

import { knownGenesis, knownLedger, knownTestnet } from './defaults/index.js';

describe('defaults', (): void => {
  const genesisKeys = Object.keys(knownGenesis);
  const ledgerKeys = Object.keys(knownLedger);

  describe('genesis', (): void => {
    it('has hex values for all genesis chains', (): void => {
      expect(
        genesisKeys.filter((network) =>
          !knownGenesis[network].length ||
          knownGenesis[network].some((g) => !isHex(g, 256))
        )
      ).toEqual([]);
    });

    it('has no entries for testnets', (): void => {
      expect(
        genesisKeys.filter((network) =>
          knownTestnet[network]
        )
      ).toEqual([]);
    });

    it('has genesis for all Ledger chains', (): void => {
      expect(
        ledgerKeys.filter((network) =>
          !knownGenesis[network]
        )
      ).toEqual([]);
    });
  });

  describe('Ledger', (): void => {
    it('has entries for each of the apps (hwledger -> networks)', (): void => {
      expect(
        ledgerKeys.filter((network) =>
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
});
