// Copyright 2017-2020 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

export type Icon = 'beachball' | 'empty' | 'jdenticon' | 'polkadot' | 'substrate';

export interface NetworkFromSubstrate {
  decimals: number[] | null,
  displayName: string;
  network: string;
  prefix: number;
  genesisHash?: string[] | null;
  icon?: Icon | null;
  standardAccount: '*25519' | null;
  symbols: string[] | null;
  website: string | null;
}

export interface Network extends NetworkFromSubstrate {
  genesisHash: string[];
  icon: Icon;
}

export interface Ss58Registry {
  registry: NetworkFromSubstrate[];
  specification: string;
  schema: Record<string, string>;
}
