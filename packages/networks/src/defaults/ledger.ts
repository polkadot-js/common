// Copyright 2017-2022 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KnownLedger } from '../types';

// These match up with the keys of the ledgerApps object in the @polkadot/hw-ledger/defaults.ts
// and maps to the known slip44 (minus the `0x8` hard derivation flag)
//
// NOTE: Any network here needs to have a genesisHash attached in the ./genesis.ts config
export const knownLedger: KnownLedger = {
  acala: 0x00000313,
  bifrost: 0x00000314,
  centrifuge: 0x000002eb,
  'dock-mainnet': 0x00000252,
  edgeware: 0x0000020b,
  equilibrium: 0x05f5e0fd,
  genshiro: 0x05f5e0fc,
  karura: 0x000002ae,
  kusama: 0x000001b2,
  'nodle-chain': 0x000003eb,
  polkadot: 0x00000162,
  polymesh: 0x00000253,
  sora: 0x00000269,
  statemine: 0x000001b2, // common-good on Kusama, shares derivation
  statemint: 0x00000162, // common-good on Polkadot, shares derivation
  xxnetwork: 0x000007a3
};
