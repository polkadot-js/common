// Copyright 2017-2021 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

// This contains exactly the same information as available in (with some extensions)
// https://raw.githubusercontent.com/paritytech/substrate/master/ss58-registry.json
//
// Once the above is published as a package, the duplication here can be removed

import type { Network, NetworkFromSubstrate, NetworkFromSubstrateNamed } from './types';

import { knownGenesis, knownIcon, knownLedger, knownTestnet } from './known';
import { knownSubstrate } from './knownSubstrate';

export { packageInfo } from './packageInfo';

// These are known prefixes that are not sorted
const UNSORTED = [0, 2, 42];

export const all: NetworkFromSubstrate[] = knownSubstrate
  .map((o): NetworkFromSubstrate => {
    const n = o as NetworkFromSubstrate;
    const genesis = knownGenesis.find(({ network }) => n.network === network);
    const icon = knownIcon.find(({ network }) => n.network === network);
    const ledger = knownLedger.find(({ network }) => n.network === network);
    const test = knownTestnet.find(({ network }) => n.network === network);

    if (ledger) {
      n.hasLedgerSupport = true;
      n.slip44 = ledger.slip44;
    } else {
      n.hasLedgerSupport = false;
    }

    n.genesisHash = genesis
      ? genesis.genesisHash
      : [];

    n.icon = icon
      ? icon.icon
      : 'substrate';

    n.isIgnored = !!test;

    return n;
  });

// The list of available/claimed prefixes
//   - no testnets
//   - we only include those where we have a standardAccount
//   - when no icon has been specified, default to substrate
//   - sort by name, however we keep 0, 2, 42 first in the list
export const available: Network[] = all
  .filter((n): n is NetworkFromSubstrateNamed => !n.isIgnored && !!n.network)
  .sort((a, b) =>
    UNSORTED.includes(a.prefix) && UNSORTED.includes(b.prefix)
      ? 0
      : UNSORTED.includes(a.prefix)
        ? -1
        : UNSORTED.includes(b.prefix)
          ? 1
          : a.displayName.localeCompare(b.displayName)
  );

// A filtered list of those chains we have details about (genesisHashes)
export default available.filter((n) => n.genesisHash.length || n.prefix === 42);
