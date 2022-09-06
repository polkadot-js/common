// Copyright 2017-2022 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KnownLedger } from '../types';

// These match up with the keys of the ledgerApps object in the @polkadot/hw-ledger/defaults.ts
// and maps to the known slip44 (minus the `0x8` hard derivation flag)
//
// NOTE: Any network here needs to have a genesisHash attached in the ./genesis.ts config
export const knownLedger: KnownLedger = {
  acala: 0x00000313,
  'aleph-node': 0x00000283,
  astar: 0x0000032a,
  bifrost: 0x00000314,
  'bifrost-kusama': 0x00000314,
  centrifuge: 0x000002eb,
  composable: 0x00000162,
  'dock-mainnet': 0x00000252,
  edgeware: 0x0000020b,
  equilibrium: 0x05f5e0fd,
  genshiro: 0x05f5e0fc,
  'interlay-parachain': 0x00000162,
  karura: 0x000002ae,
  khala: 0x000001b2,
  kusama: 0x000001b2,
  'nodle-para': 0x000003eb,
  parallel: 0x00000162,
  phala: 0x00000162,
  polkadex: 0x0000031f,
  polkadot: 0x00000162,
  polymesh: 0x00000253,
  sora: 0x00000269,
  stafi: 0x0000038b,
  statemine: 0x000001b2, // common-good on Kusama, shares derivation
  statemint: 0x00000162, // common-good on Polkadot, shares derivation
  unique: 0x00000162,
  xxnetwork: 0x000007a3
};
