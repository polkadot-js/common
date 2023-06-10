// Copyright 2017-2023 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { RegistryEntry } from '@substrate/ss58-registry';
import type { HexString } from '@polkadot/util/types';

export type Icon = 'beachball' | 'empty' | 'jdenticon' | 'polkadot' | 'substrate';

export type KnownIcon = Record<string, Icon>;

export type KnownLedger = Record<string, number>;

export type KnownGenesis = Record<string, HexString[]>;

export type KnownSubstrate = RegistryEntry;

export type KnownTestnet = Record<string, true>;

export interface SubstrateNetwork extends KnownSubstrate {
  genesisHash: string[];
  hasLedgerSupport: boolean;
  icon: Icon;
  isIgnored: boolean;
  isTestnet: boolean;
  slip44?: number | null;
}

export interface Network extends SubstrateNetwork {
  network: string;
}

export interface Ss58Registry {
  registry: KnownSubstrate[];
  specification: string;
  schema: Record<keyof KnownSubstrate, string>;
}
