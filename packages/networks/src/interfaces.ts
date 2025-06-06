// Copyright 2017-2025 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KnownSubstrate, Network, SubstrateNetwork } from './types.js';

import knownSubstrate from '@substrate/ss58-registry';

import { knownGenesis, knownIcon, knownLedger, knownTestnet } from './defaults/index.js';

// These are known prefixes that are not sorted
const UNSORTED = [0, 2, 42];
const TESTNETS = ['testnet'];

function toExpanded (o: KnownSubstrate): SubstrateNetwork {
  const network = o.network || '';
  const nameParts = network.replace(/_/g, '-').split('-');
  const n = o as SubstrateNetwork;

  // ledger additions
  n.slip44 = knownLedger[network];
  n.hasLedgerSupport = !!n.slip44;

  // general items
  n.genesisHash = knownGenesis[network] || [];
  n.icon = knownIcon[network] || 'substrate';

  // filtering
  n.isTestnet = !!knownTestnet[network] || TESTNETS.includes(nameParts[nameParts.length - 1]);
  n.isIgnored = n.isTestnet || (
    !(
      o.standardAccount &&
      o.decimals?.length &&
      o.symbols?.length
    ) &&
    o.prefix !== 42
  );

  return n;
}

function filterSelectable ({ genesisHash, prefix }: Network): boolean {
  return !!genesisHash.length || prefix === 42;
}

function filterAvailable (n: SubstrateNetwork): n is Network {
  return !n.isIgnored && !!n.network;
}

function sortNetworks (a: Network, b: Network): number {
  const isUnSortedA = UNSORTED.includes(a.prefix);
  const isUnSortedB = UNSORTED.includes(b.prefix);

  return isUnSortedA === isUnSortedB
    ? isUnSortedA
      ? 0
      : a.displayName.localeCompare(b.displayName)
    : isUnSortedA
      ? -1
      : 1;
}

// This is all the Substrate networks with our additional information
export const allNetworks = knownSubstrate.map(toExpanded);

// The list of available/claimed prefixes
//   - no testnets
//   - we only include those where we have a standardAccount
//   - sort by name, however we keep 0, 2, 42 first in the list
export const availableNetworks = allNetworks.filter(filterAvailable).sort(sortNetworks);

// A filtered list of those chains we have details about (genesisHashes)
export const selectableNetworks = availableNetworks.filter(filterSelectable);
