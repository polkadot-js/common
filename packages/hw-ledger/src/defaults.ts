// Copyright 2017-2022 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type Transport from '@ledgerhq/hw-transport';
import type { SubstrateApp } from '@zondax/ledger-substrate';

import { newAcalaApp, newBifrostApp, newCentrifugeApp, newDockApp, newEdgewareApp, newEquilibriumApp, newGenshiroApp, newKaruraApp, newKusamaApp, newNodleApp, newParallelApp, newPolkadotApp, newPolymeshApp, newSoraApp, newStatemineApp, newStatemintApp, newXXNetworkApp } from '@zondax/ledger-substrate';

// These match up with the keys of the knownLedger object in the @polkadot/networks/defaults/ledger.ts
export const ledgerApps: Record<string, (transport: Transport) => SubstrateApp> = {
  acala: newAcalaApp,
  bifrost: newBifrostApp,
  centrifuge: newCentrifugeApp,
  'dock-mainnet': newDockApp,
  edgeware: newEdgewareApp,
  equilibrium: newEquilibriumApp,
  genshiro: newGenshiroApp,
  karura: newKaruraApp,
  kusama: newKusamaApp,
  'nodle-chain': newNodleApp,
  parallel: newParallelApp,
  polkadot: newPolkadotApp,
  polymesh: newPolymeshApp,
  sora: newSoraApp,
  statemine: newStatemineApp,
  statemint: newStatemintApp,
  xxnetwork: newXXNetworkApp
};
