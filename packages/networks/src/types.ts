// Copyright 2017-2021 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

export type Icon = 'beachball' | 'empty' | 'jdenticon' | 'polkadot' | 'substrate';

export interface KnownSubstrate {
  decimals: number[] | null,
  displayName: string;
  network: string | null;
  prefix: number;
  standardAccount: '*25519' | null;
  symbols: string[] | null;
  website: string | null;
}

export type KnownIcon = Record<string, Icon>;

export type KnownLedger = Record<string, number>;

export type KnownGenesis = Record<string, string[]>;

export type KnownTestnet = Record<string, true>;

export interface NetworkFromSubstrate extends KnownSubstrate {
  genesisHash: string[];
  hasLedgerSupport: boolean;
  icon: Icon;
  isIgnored: boolean;
  slip44?: number | null;
}

export interface NetworkFromSubstrateNamed extends NetworkFromSubstrate {
  network: string;
}

export interface Network extends NetworkFromSubstrateNamed {
  icon: Icon;
}

export interface Ss58Registry {
  registry: KnownSubstrate[];
  specification: string;
  schema: Record<string, string>;
}
