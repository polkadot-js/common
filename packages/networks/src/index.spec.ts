// Copyright 2017-2024 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import type { SubstrateNetwork } from './types.js';

import { knownGenesis, knownIcon, knownLedger, knownTestnet } from './defaults/index.js';
import { allNetworks, availableNetworks, selectableNetworks } from './index.js';

describe('availableNetworks', (): void => {
  it('has the correct starting order', (): void => {
    expect(availableNetworks.slice(0, 3).map(({ prefix }) => prefix)).toEqual([0, 2, 42]);
  });

  it('has a sorted list (first external, last external)', (): void => {
    expect(availableNetworks[3].displayName).toEqual('3DP network');
    expect(availableNetworks[availableNetworks.length - 1].displayName).toEqual('ZERO');
  });

  it('has no ignored networks', (): void => {
    expect(availableNetworks.some(({ isIgnored }) => isIgnored)).toEqual(false);
  });

  it('has no reserved networks', (): void => {
    expect(availableNetworks.some(({ prefix }) => prefix === 47)).toEqual(false);
  });

  it('has allNetworks genesis information', (): void => {
    expect(
      Object.entries(knownGenesis).filter(([network, genesisHash]) =>
        availableNetworks.some((a) =>
          a.network === network &&
          genesisHash.some((g, index) => a.genesisHash[index] !== g)
        )
      )
    ).toEqual([]);
  });

  it('has allNetworks ledger details', (): void => {
    expect(
      Object.entries(knownLedger).filter(([network, slip44]) =>
        availableNetworks.some((a) =>
          a.network === network && (
            a.slip44 !== slip44 ||
            !a.hasLedgerSupport ||
            !a.genesisHash.length
          )
        )
      )
    ).toEqual([]);
  });

  it('has no testnets exposed', (): void => {
    expect(
      Object.keys(knownTestnet).filter((network) =>
        availableNetworks.some((a) =>
          a.network === network
        )
      )
    ).toEqual([]);
  });

  it('has allNetworks icons, except for overrides', (): void => {
    expect(
      availableNetworks.filter(({ icon, network }) =>
        icon !== 'substrate' &&
        knownIcon[network] !== icon
      )
    ).toEqual([]);
  });

  it('has all the correct fields', (): void => {
    expect(availableNetworks[0]).toEqual({
      decimals: [10],
      displayName: 'Polkadot Relay Chain',
      genesisHash: [
        '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'
      ],
      hasLedgerSupport: true,
      icon: 'polkadot',
      isIgnored: false,
      isTestnet: false,
      network: 'polkadot',
      prefix: 0,
      slip44: 354,
      standardAccount: '*25519',
      symbols: ['DOT'],
      website: 'https://polkadot.network'
    });
  });
});

describe('allNetworks', (): void => {
  it('has no ss58 duplicates', (): void => {
    const dupes: SubstrateNetwork[] = [];
    const uniques: SubstrateNetwork[] = [];

    allNetworks.forEach((a): void => {
      if (uniques.some((u) => u.prefix === a.prefix)) {
        dupes.push(a);
      } else {
        uniques.push(a);
      }
    });

    expect(dupes).toEqual([]);
  });
});

describe('selectableNetworks', (): void => {
  it('has the correct starting order', (): void => {
    expect(selectableNetworks.slice(0, 3).map(({ prefix }) => prefix)).toEqual([0, 2, 42]);
  });

  it('has a sorted list (first external, last external)', (): void => {
    expect(selectableNetworks[3].displayName).toEqual('3DP network');
    expect(selectableNetworks[selectableNetworks.length - 1].displayName).toEqual('Zeitgeist');
  });
});
