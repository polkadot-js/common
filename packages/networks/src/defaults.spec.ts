// Copyright 2017-2021 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ledgerApps } from '@polkadot/hw-ledger/defaults';
import { isHex } from '@polkadot/util';

import { knownGenesis, knownLedger } from './defaults';

describe('defaults', (): void => {
  describe('genesis', (): void => {
    it('has hex values for all genesis chains', (): void => {
      expect(
        Object.keys(knownGenesis).filter((network) =>
          !knownGenesis[network].length ||
          knownGenesis[network].some((g) => !isHex(g, 256))
        )
      ).toEqual([]);
    });

    it('has genesis for all Ledger chains', (): void => {
      expect(
        Object.keys(knownLedger).filter((network) =>
          !knownGenesis[network]
        )
      ).toEqual([]);
    });
  });

  describe('Ledger', (): void => {
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
});
