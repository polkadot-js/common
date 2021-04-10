// Copyright 2017-2021 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KnownGenesis, KnownIcon, KnownLedger, KnownTestnet } from './types';

// NOTE: In the case where the network was hard-spooned and multiple genesisHashes
// are provided, it needs to be in reverse order, i.e. most-recent first, oldest
// last. This make lookups for the current a simple genesisHash[0]
// (See Kusama as an example)
export const knownGenesis: KnownGenesis[] = [
  {
    genesisHash: ['0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'],
    network: 'polkadot'
  },
  {
    genesisHash: [
      '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe', // Kusama CC3,
      '0xe3777fa922cafbff200cadeaea1a76bd7898ad5b89f7848999058b50e715f636', // Kusama CC2
      '0x3fd7b9eb6a00376e5be61f01abb429ffb0b104be05eaff4d458da48fcd425baf' // Kusama CC1
    ],
    network: 'kusama'
  },
  {
    genesisHash: ['0x3e86364d4b4894021cb2a0390bcf2feb5517d5292f2de2bb9404227e908b0b8b'],
    network: 'plasm'
  },
  {
    genesisHash: ['0x742a2ca70c2fda6cee4f8df98d64c4c670a052d9568058982dad9d5a7a135c5b'],
    network: 'edgeware'
  },
  {
    genesisHash: ['0x9deeb940c92ae02111c3bd5baca89970384f4c9849f02a1b2e53e66414d30f9f'],
    network: 'polymesh'
  },
  {
    genesisHash: ['0xf7a99d3cb92853d00d5275c971c132c074636256583fee53b3bbe60d7b8769ba'],
    network: 'kulupu'
  },
  {
    genesisHash: ['0xf73467c6544aa68df2ee546b135f955c46b90fa627e9b5d7935f41061bb8a5a9'],
    network: 'dock-mainnet'
  },
  {
    genesisHash: ['0x0bd72c1c305172e1275278aaeb3f161e02eccb7a819e63f62d47bd53a28189f8'],
    network: 'subsocial'
  }
];

export const knownIcon: KnownIcon[] = [
  {
    icon: 'polkadot',
    network: 'polkadot'
  },
  {
    icon: 'polkadot',
    network: 'kusama'
  }
];

export const knownLedger: KnownLedger[] = [
  {
    network: 'polkadot',
    slip44: 0x00000162
  },
  {
    network: 'kusama',
    slip44: 0x000001b2
  },
  {
    network: 'polymesh',
    slip44: 0x00000253
  },
  {
    network: 'dock-mainnet',
    slip44: 0x00000252
  }
];

export const knownTestnet: KnownTestnet[] = [
  { network: 'dock-testnet' },
  { network: 'zero-alphaville' },
  { network: 'jupiter' },
  { network: 'mathchain-testnet' }
];
