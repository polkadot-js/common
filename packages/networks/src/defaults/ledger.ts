// Copyright 2017-2024 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KnownLedger } from '../types.js';

// These match up with the keys of the ledgerApps object in the @polkadot/hw-ledger/defaults.ts
// and maps to the known slip44 (minus the `0x8` hard derivation flag)
//
// NOTE: Any network here needs to have a genesisHash attached in the ./genesis.ts config
export const knownLedger: KnownLedger = {
  acala: 0x00000313,
  ajuna: 0x00000162,
  'aleph-node': 0x00000283,
  astar: 0x0000032a,
  bifrost: 0x00000314,
  'bifrost-kusama': 0x00000314,
  bittensor: 0x00000162,
  centrifuge: 0x000002eb,
  composable: 0x00000162,
  darwinia: 0x00000162,
  'dock-mainnet': 0x00000252,
  edgeware: 0x0000020b,
  encointer: 0x000001b2,
  enjin: 0x00000483,
  equilibrium: 0x05f5e0fd,
  genshiro: 0x05f5e0fc,
  hydradx: 0x00000162,
  integritee: 0x000007df,
  'interlay-parachain': 0x00000162,
  karura: 0x000002ae,
  khala: 0x000001b2,
  kusama: 0x000001b2,
  matrixchain: 0x00000483,
  nodle: 0x000003eb,
  origintrail: 0x00000162,
  parallel: 0x00000162,
  peaq: 0x00000d0a,
  pendulum: 0x00000162,
  phala: 0x00000162,
  picasso: 0x000001b2,
  polkadex: 0x0000031f,
  polkadot: 0x00000162,
  polymesh: 0x00000253,
  quartz: 0x00000277,
  sora: 0x00000269,
  stafi: 0x0000038b,
  statemine: 0x000001b2, // common-good on Kusama, shares derivation
  statemint: 0x00000162, // common-good on Polkadot, shares derivation
  ternoa: 0x00003e3,
  unique: 0x00000295,
  vtb: 0x000002b6,
  xxnetwork: 0x000007a3,
  zeitgeist: 0x00000162
};
