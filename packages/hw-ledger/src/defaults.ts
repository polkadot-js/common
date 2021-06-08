// Copyright 2017-2021 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type Transport from '@ledgerhq/hw-transport';
import type { SubstrateApp } from '@zondax/ledger-polkadot';

import { newDockApp, newEdgewareApp, newEquilibriumApp, newKusamaApp, newPolkadotApp, newPolymeshApp } from '@zondax/ledger-polkadot';

// These match up with the network keys in the @polkadot/networks package
// (which is turn aligns with the substrate/ss58-registry.json as the single
// source of truth)
export const ledgerApps: Record<string, (transport: Transport) => SubstrateApp> = {
  'dock-mainnet': newDockApp,
  edgeware: newEdgewareApp,
  equilibrium: newEquilibriumApp,
  kusama: newKusamaApp,
  polkadot: newPolkadotApp,
  polymesh: newPolymeshApp
};
