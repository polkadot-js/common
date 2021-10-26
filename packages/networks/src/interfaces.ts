// Copyright 2017-2021 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Network, SubstrateNetwork } from './types';

import { knownGenesis, knownIcon, knownLedger, knownTestnet } from './defaults';
import { knownSubstrate } from './substrate';

// These are known prefixes that are not sorted
const UNSORTED = [0, 2, 42];
const TESTNETS = ['testnet'];

export const allNetworks = knownSubstrate.map((o): SubstrateNetwork => {
  const network = o.network || '';
  const nameParts = network.replace(/_/g, '-').split('-');
  const n = o as SubstrateNetwork;

  n.slip44 = knownLedger[network];
  n.hasLedgerSupport = !!n.slip44;

  n.genesisHash = knownGenesis[network] || [];
  n.icon = knownIcon[network] || 'substrate';
  n.isTestnet = !!knownTestnet[network] || TESTNETS.includes(nameParts[nameParts.length - 1]);
  n.isIgnored = n.isTestnet || (!(o.standardAccount && o.decimals && o.symbols) && o.prefix !== 42);

  return n;
});

// The list of available/claimed prefixes
//   - no testnets
//   - we only include those where we have a standardAccount
//   - sort by name, however we keep 0, 2, 42 first in the list
export const availableNetworks = allNetworks
  .filter((n): n is Network => !n.isIgnored && !!n.network)
  .sort((a, b) =>
    UNSORTED.includes(a.prefix) === UNSORTED.includes(b.prefix)
      ? 0
      : UNSORTED.includes(a.prefix)
        ? -1
        : UNSORTED.includes(b.prefix)
          ? 1
          : a.displayName.localeCompare(b.displayName)
  );

// A filtered list of those chains we have details about (genesisHashes)
export const selectableNetworks = availableNetworks.filter((n) => n.genesisHash.length || n.prefix === 42);
