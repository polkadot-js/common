// Copyright 2017-2021 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

// This contains exactly the same information as available in (with some extensions)
// https://raw.githubusercontent.com/paritytech/substrate/master/ss58-registry.json
//
// Once the above is published as a package, the duplication here can be removed

import type { Network, NetworkFromSubstrate, NetworkFromSubstrateNamed } from './types';

export { packageInfo } from './packageInfo';

// These are known prefixes that are not sorted
const UNSORTED = [0, 2, 42];

// NOTE: In the case where the network was hard-spooned and multiple genesisHashes
// are provided, it needs to be in reverse order, i.e. most-recent first, oldest
// last. This make lookups for the current a simple genesisHash[0]
// (See Kusama as an example)

const createReserved = (prefix: number, displayName: string, network: string | null = null): NetworkFromSubstrate => ({
  decimals: null,
  displayName,
  isIgnored: true,
  network,
  prefix,
  standardAccount: null,
  symbols: null,
  website: null
});

export const all: NetworkFromSubstrate[] = [
  {
    decimals: [10],
    displayName: 'Polkadot Relay Chain',
    genesisHash: ['0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'],
    hasLedgerSupport: true,
    icon: 'polkadot',
    network: 'polkadot',
    prefix: 0,
    slip44: 0x00000162,
    standardAccount: '*25519',
    symbols: ['DOT'],
    website: 'https://polkadot.network'
  },
  createReserved(1, 'Bare 32-bit Schnorr/Ristretto (S/R 25519) public key.'),
  {
    decimals: [12],
    displayName: 'Kusama Relay Chain',
    genesisHash: [
      '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe', // Kusama CC3,
      '0xe3777fa922cafbff200cadeaea1a76bd7898ad5b89f7848999058b50e715f636', // Kusama CC2
      '0x3fd7b9eb6a00376e5be61f01abb429ffb0b104be05eaff4d458da48fcd425baf' // Kusama CC1
    ],
    hasLedgerSupport: true,
    icon: 'polkadot',
    network: 'kusama',
    prefix: 2,
    slip44: 0x000001b2,
    standardAccount: '*25519',
    symbols: ['KSM'],
    website: 'https://kusama.network'
  },
  createReserved(3, 'Bare 32-bit Ed25519 public key.'),
  {
    decimals: null,
    displayName: 'Katal Chain',
    network: 'katalchain',
    prefix: 4,
    standardAccount: '*25519',
    symbols: null,
    website: null
  },
  {
    decimals: [15],
    displayName: 'Plasm Network',
    genesisHash: ['0x3e86364d4b4894021cb2a0390bcf2feb5517d5292f2de2bb9404227e908b0b8b'],
    network: 'plasm',
    prefix: 5,
    standardAccount: '*25519',
    symbols: ['PLM'],
    website: 'https://plasmnet.io'
  },
  {
    decimals: [12],
    displayName: 'Bifrost',
    network: 'bifrost',
    prefix: 6,
    standardAccount: '*25519',
    symbols: ['BNC'],
    website: 'https://bifrost.finance/'
  },
  {
    decimals: [18],
    displayName: 'Edgeware',
    genesisHash: ['0x742a2ca70c2fda6cee4f8df98d64c4c670a052d9568058982dad9d5a7a135c5b'],
    network: 'edgeware',
    prefix: 7,
    standardAccount: '*25519',
    symbols: ['EDG'],
    website: 'https://edgewa.re'
  },
  {
    decimals: [18],
    displayName: 'Acala Karura Canary',
    network: 'karura',
    prefix: 8,
    standardAccount: '*25519',
    symbols: ['KAR'],
    website: 'https://acala.network/'
  },
  {
    decimals: [18],
    displayName: 'Laminar Reynolds Canary',
    network: 'reynolds',
    prefix: 9,
    standardAccount: '*25519',
    symbols: ['REY'],
    website: 'http://laminar.network/'
  },
  {
    decimals: [18],
    displayName: 'Acala',
    network: 'acala',
    prefix: 10,
    standardAccount: '*25519',
    symbols: ['ACA'],
    website: 'https://acala.network/'
  },
  {
    decimals: [18],
    displayName: 'Laminar',
    network: 'laminar',
    prefix: 11,
    standardAccount: '*25519',
    symbols: ['LAMI'],
    website: 'http://laminar.network/'
  },
  {
    decimals: [6],
    displayName: 'Polymesh',
    genesisHash: ['0x12fddc9e2128b3fe571e4e5427addcb87fcaf08493867a68dd6ae44b406b39c7'],
    hasLedgerSupport: true,
    network: 'polymesh',
    prefix: 12,
    slip44: 0x00000253,
    standardAccount: '*25519',
    symbols: ['POLYX'],
    website: 'https://polymath.network/'
  },
  {
    decimals: null,
    displayName: 'SubstraTEE',
    network: 'substratee',
    prefix: 13,
    standardAccount: '*25519',
    symbols: null,
    website: 'https://www.substratee.com'
  },
  {
    decimals: [0],
    displayName: 'Totem',
    network: 'totem',
    prefix: 14,
    standardAccount: '*25519',
    symbols: ['XTX'],
    website: 'https://totemaccounting.com'
  },
  {
    decimals: [12],
    displayName: 'Synesthesia',
    network: 'synesthesia',
    prefix: 15,
    standardAccount: '*25519',
    symbols: ['SYN'],
    website: 'https://synesthesia.network/'
  },
  {
    decimals: [12],
    displayName: 'Kulupu',
    genesisHash: ['0xf7a99d3cb92853d00d5275c971c132c074636256583fee53b3bbe60d7b8769ba'],
    network: 'kulupu',
    prefix: 16,
    standardAccount: '*25519',
    symbols: ['KLP'],
    website: 'https://kulupu.network/'
  },
  {
    decimals: null,
    displayName: 'Dark Mainnet',
    network: 'dark',
    prefix: 17,
    standardAccount: '*25519',
    symbols: null,
    website: null
  },
  {
    decimals: [9, 9],
    displayName: 'Darwinia Network',
    network: 'darwinia',
    prefix: 18,
    standardAccount: '*25519',
    symbols: ['RING', 'KTON'],
    website: 'https://darwinia.network/'
  },
  {
    decimals: [12],
    displayName: 'GeekCash',
    network: 'geek',
    prefix: 19,
    standardAccount: '*25519',
    symbols: ['GEEK'],
    website: 'https://geekcash.org'
  },
  {
    decimals: [12],
    displayName: 'Stafi',
    genesisHash: ['0x290a4149f09ea0e402c74c1c7e96ae4239588577fe78932f94f5404c68243d80'],
    network: 'stafi',
    prefix: 20,
    standardAccount: '*25519',
    symbols: ['FIS'],
    website: 'https://stafi.io'
  },
  {
    decimals: [6],
    displayName: 'Dock Testnet',
    isIgnored: true, // testnet
    network: 'dock-testnet',
    prefix: 21,
    standardAccount: '*25519',
    symbols: ['DCK'],
    website: 'https://dock.io'
  },
  {
    decimals: [6],
    displayName: 'Dock Mainnet',
    genesisHash: ['0xf73467c6544aa68df2ee546b135f955c46b90fa627e9b5d7935f41061bb8a5a9'],
    hasLedgerSupport: true,
    network: 'dock-mainnet',
    prefix: 22,
    slip44: 0x00000252,
    standardAccount: '*25519',
    symbols: ['DCK'],
    website: 'https://dock.io'
  },
  {
    decimals: null,
    displayName: 'ShiftNrg',
    network: 'shift',
    prefix: 23,
    standardAccount: '*25519',
    symbols: null,
    website: null
  },
  {
    decimals: [18],
    displayName: 'ZERO',
    network: 'zero',
    prefix: 24,
    standardAccount: '*25519',
    symbols: ['PLAY'],
    website: 'https://zero.io'
  },
  {
    decimals: [18],
    displayName: 'ZERO Alphaville',
    isIgnored: true, // testnet
    network: 'zero-alphaville',
    prefix: 25,
    standardAccount: '*25519',
    symbols: ['PLAY'],
    website: 'https://zero.io'
  },
  {
    decimals: [10],
    displayName: 'Jupiter',
    isIgnored: true, // testnet
    network: 'jupiter',
    prefix: 26,
    standardAccount: '*25519',
    symbols: ['jDOT'],
    website: 'https://jupiter.patract.io'
  },
  {
    decimals: [10, 12],
    displayName: 'Patract',
    network: 'patract',
    prefix: 27,
    standardAccount: '*25519',
    symbols: ['pDOT', 'pKSM'],
    website: 'https://patract.network'
  },
  {
    decimals: null,
    displayName: 'Subsocial',
    genesisHash: ['0x0bd72c1c305172e1275278aaeb3f161e02eccb7a819e63f62d47bd53a28189f8'],
    network: 'subsocial',
    prefix: 28,
    standardAccount: '*25519',
    symbols: null,
    website: null
  },
  {
    decimals: [18],
    displayName: 'Dhiway CORD Network',
    network: 'cord',
    prefix: 29,
    standardAccount: '*25519',
    symbols: ['DCU'],
    website: 'https://dhiway.com/'
  },
  {
    decimals: [12],
    displayName: 'Phala Network',
    network: 'phala',
    prefix: 30,
    standardAccount: '*25519',
    symbols: ['PHA'],
    website: 'https://phala.network'
  },
  {
    decimals: [12],
    displayName: 'Litentry Network',
    network: 'litentry',
    prefix: 31,
    standardAccount: '*25519',
    symbols: ['LIT'],
    website: 'https://litentry.com/'
  },
  {
    decimals: [9],
    displayName: 'Robonomics',
    network: 'robonomics',
    prefix: 32,
    standardAccount: '*25519',
    symbols: ['XRT'],
    website: 'https://robonomics.network'
  },
  {
    decimals: null,
    displayName: 'DataHighway',
    network: 'datahighway',
    prefix: 33,
    standardAccount: '*25519',
    symbols: null,
    website: null
  },
  {
    decimals: [12],
    displayName: 'Ares Protocol',
    network: 'ares',
    prefix: 34,
    standardAccount: '*25519',
    symbols: ['ARES'],
    website: 'https://www.aresprotocol.com/'
  },
  {
    decimals: [15],
    displayName: 'Valiu Liquidity Network',
    network: 'vln',
    prefix: 35,
    standardAccount: '*25519',
    symbols: ['USDv'],
    website: 'https://valiu.com/'
  },
  {
    decimals: [18],
    displayName: 'Centrifuge Chain',
    network: 'centrifuge',
    prefix: 36,
    standardAccount: '*25519',
    symbols: ['RAD'],
    website: 'https://centrifuge.io/'
  },
  {
    decimals: [18],
    displayName: 'Nodle Chain',
    network: 'nodle',
    prefix: 37,
    standardAccount: '*25519',
    symbols: ['NODL'],
    website: 'https://nodle.io/'
  },
  {
    decimals: [18],
    displayName: 'KILT Chain',
    network: 'kilt',
    prefix: 38,
    standardAccount: '*25519',
    symbols: ['KILT'],
    website: 'https://kilt.io/'
  },
  {
    decimals: [18],
    displayName: 'MathChain mainnet',
    network: 'mathchain',
    prefix: 39,
    standardAccount: '*25519',
    symbols: ['MATH'],
    website: 'https://mathwallet.org'
  },
  {
    decimals: [18],
    displayName: 'MathChain testnet',
    isIgnored: true, // testnet
    network: 'mathchain-testnet',
    prefix: 40,
    standardAccount: '*25519',
    symbols: ['MATH'],
    website: 'https://mathwallet.org'
  },
  {
    decimals: null,
    displayName: 'Polimec Chain',
    network: 'poli',
    prefix: 41,
    standardAccount: '*25519',
    symbols: null,
    website: 'https://polimec.io/'
  },
  {
    decimals: null,
    displayName: 'Substrate',
    network: 'substrate',
    prefix: 42,
    standardAccount: '*25519',
    symbols: null,
    website: 'https://substrate.dev/'
  },
  createReserved(43, 'Bare 32-bit ECDSA SECP-256k1 public key.'),
  {
    decimals: [8],
    displayName: 'ChainX',
    network: 'chainx',
    prefix: 44,
    standardAccount: '*25519',
    symbols: ['PCX'],
    website: 'https://chainx.org/'
  },
  {
    decimals: [12, 12],
    displayName: 'UniArts Network',
    network: 'uniarts',
    prefix: 45,
    standardAccount: '*25519',
    symbols: ['UART', 'UINK'],
    website: 'https://uniarts.me'
  },
  createReserved(46, 'This prefix is reserved.', 'reserved46'),
  createReserved(47, 'This prefix is reserved.', 'reserved47'),
  {
    decimals: [12],
    displayName: 'Neatcoin Mainnet',
    network: 'neatcoin',
    prefix: 48,
    standardAccount: '*25519',
    symbols: ['NEAT'],
    website: 'https://neatcoin.org'
  },
  {
    decimals: [12],
    displayName: 'HydraDX',
    network: 'hydradx',
    prefix: 63,
    standardAccount: '*25519',
    symbols: ['HDX'],
    website: 'https://hydradx.io'
  },
  {
    decimals: [18],
    displayName: 'AvN Mainnet',
    network: 'aventus',
    prefix: 65,
    standardAccount: '*25519',
    symbols: ['AVT'],
    website: 'https://aventus.io'
  },
  {
    decimals: [12],
    displayName: 'Crust Network',
    network: 'crust',
    prefix: 66,
    standardAccount: '*25519',
    symbols: ['CRU'],
    website: 'https://crust.network'
  },
  {
    decimals: [18],
    displayName: 'Social Network',
    network: 'social-network',
    prefix: 252,
    standardAccount: '*25519',
    symbols: ['NET'],
    website: 'https://social.network'
  }
];

// The list of available/claimed prefixes
//   - no testnets
//   - we only include those where we have a standardAccount
//   - when no icon has been specified, default to substrate
//   - sort by name, however we keep 0, 2, 42 first in the list
export const available: Network[] = all
  .filter((n): n is NetworkFromSubstrateNamed => !n.isIgnored && !!n.network)
  .map((n) => ({ ...n, genesisHash: n.genesisHash || [], icon: n.icon || 'substrate' }))
  .sort((a, b) =>
    UNSORTED.includes(a.prefix) && UNSORTED.includes(b.prefix)
      ? 0
      : UNSORTED.includes(a.prefix)
        ? -1
        : UNSORTED.includes(b.prefix)
          ? 1
          : a.displayName.localeCompare(b.displayName)
  );

// A filtered list of those chains we have details about (genesisHashes)
export default available.filter((n) => n.genesisHash.length || n.prefix === 42);
