// Copyright 2017-2021 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type Transport from '@ledgerhq/hw-transport';
import type { SubstrateApp } from '@zondax/ledger-substrate';

import { newBifrostApp, newCentrifugeApp, newDockApp, newEdgewareApp, newEquilibriumApp, newGenshiroApp, newKusamaApp, newNodleApp, newPolkadotApp, newPolymeshApp, newSoraApp, newStatemineApp } from '@zondax/ledger-substrate';

// These match up with the keys of the knownLedger object in the @polkadot/networks/defaults.ts
export const ledgerApps: Record<string, (transport: Transport) => SubstrateApp> = {
  bifrost: newBifrostApp,
  centrifuge: newCentrifugeApp,
  'dock-mainnet': newDockApp,
  edgeware: newEdgewareApp,
  equilibrium: newEquilibriumApp,
  genshiro: newGenshiroApp,
  kusama: newKusamaApp,
  'nodle-chain': newNodleApp,
  polkadot: newPolkadotApp,
  polymesh: newPolymeshApp,
  sora: newSoraApp,
  statemine: newStatemineApp
};
