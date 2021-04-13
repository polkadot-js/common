// Copyright 2017-2021 @polkadot/hw-ledger authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type Transport from '@ledgerhq/hw-transport';

import { newDockApp, newKusamaApp, newPolkadotApp, newPolymeshApp, SubstrateApp } from '@zondax/ledger-polkadot';

// These match up with the network keys in the @polkadot/networks package
// (which is turn aligns with the substrate/ss58-registry.json as the single
// source of truth)
export const LEDGER_APPS: Record<string, (transport: Transport) => SubstrateApp> = {
  'dock-mainnet': newDockApp,
  kusama: newKusamaApp,
  polkadot: newPolkadotApp,
  polymesh: newPolymeshApp
};
