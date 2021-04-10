// Copyright 2017-2021 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

export type Icon = 'beachball' | 'empty' | 'jdenticon' | 'polkadot' | 'substrate';

interface BaseDef {
  network: string | null;
}

export interface KnownSubstrate extends BaseDef {
  decimals: number[] | null,
  displayName: string;
  prefix: number;
  standardAccount: '*25519' | null;
  symbols: string[] | null;
  website: string | null;
}

export interface KnownIcon extends BaseDef {
  icon: Icon;
}

export interface KnownLedger extends BaseDef {
  slip44: number;
}

export interface KnownGenesis extends BaseDef {
  genesisHash: string[];
}

export type KnownTestnet = BaseDef;

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
