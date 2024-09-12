// Copyright 2017-2024 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

// These map to the known name in the @zondax/ledger-substrate/supported_apps package
// but they do not reflect all ledger apps that are supported. Since ledger now has support for all
// substrate chains via the PolkadotGenericApp, any new chains that need ledger support can be added to
// `genericLedgerApps` below.
export const prevLedgerRecord: Record<string, string> = {
  acala: 'Acala',
  ajuna: 'Ajuna',
  'aleph-node': 'AlephZero',
  astar: 'Astar',
  bifrost: 'Bifrost',
  'bifrost-kusama': 'BifrostKusama',
  centrifuge: 'Centrifuge',
  composable: 'Composable',
  darwinia: 'Darwinia',
  'dock-mainnet': 'Dock',
  edgeware: 'Edgeware',
  enjin: 'Enjin',
  equilibrium: 'Equilibrium',
  genshiro: 'Genshiro',
  hydradx: 'HydraDX',
  'interlay-parachain': 'Interlay',
  karura: 'Karura',
  khala: 'Khala',
  kusama: 'Kusama',
  matrixchain: 'Matrixchain',
  nodle: 'Nodle',
  origintrail: 'OriginTrail',
  parallel: 'Parallel',
  peaq: 'Peaq',
  pendulum: 'Pendulum',
  phala: 'Phala',
  picasso: 'Picasso',
  polkadex: 'Polkadex',
  polkadot: 'Polkadot',
  polymesh: 'Polymesh',
  quartz: 'Quartz',
  sora: 'Sora',
  stafi: 'Stafi',
  statemine: 'Statemine',
  statemint: 'Statemint',
  ternoa: 'Ternoa',
  unique: 'Unique',
  vtb: 'VTB',
  xxnetwork: 'XXNetwork',
  zeitgeist: 'Zeitgeist'
};

// Any chains moving forward that are supported by the PolkadotGenericApp from ledger will input their names below.
export const genericLedgerApps = {
  bittensor: 'Bittensor',
  encointer: 'Encointer',
  integritee: 'Integritee'
};

// These match up with the keys of the knownLedger object in the @polkadot/networks/defaults/ledger.ts
export const ledgerApps: Record<string, string> = {
  ...prevLedgerRecord,
  ...genericLedgerApps
};
