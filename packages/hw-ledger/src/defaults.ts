// Copyright 2017-2022 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

// These match up with the keys of the knownLedger object in the @polkadot/networks/defaults/ledger.ts
// and maps to the known name in the @zondax/ledger-substrate/supported_apps package
export const ledgerApps: Record<string, string> = {
  acala: 'Acala',
  'aleph-node': 'AlephZero',
  astar: 'Astar',
  bifrost: 'Bifrost',
  'bifrost-kusama': 'BifrostKusama',
  centrifuge: 'Centrifuge',
  composable: 'Composable',
  'dock-mainnet': 'Dock',
  edgeware: 'Edgeware',
  equilibrium: 'Equilibrium',
  genshiro: 'Genshiro',
  'interlay-parachain': 'Interlay',
  karura: 'Karura',
  khala: 'Khala',
  kusama: 'Kusama',
  'nodle-para': 'Nodle',
  parallel: 'Parallel',
  phala: 'Phala',
  polkadex: 'Polkadex',
  polkadot: 'Polkadot',
  polymesh: 'Polymesh',
  sora: 'Sora',
  stafi: 'Stafi',
  statemine: 'Statemine',
  statemint: 'Statemint',
  unique: 'Unique',
  xxnetwork: 'XXNetwork'
};
