// Copyright 2017-2021 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KnownGenesis, KnownIcon, KnownLedger, KnownTestnet } from './types';

export const substrateRegistry = 'https://raw.githubusercontent.com/paritytech/ss58-registry/main/ss58-registry.json';

// NOTE: In the case where the network was hard-spooned and multiple genesisHashes
// are provided, it needs to be in reverse order, i.e. most-recent first, oldest
// last. This make lookups for the current a simple genesisHash[0]
// (See Kusama as an example)
export const knownGenesis: KnownGenesis = {
  acala: [
    '0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c'
  ],
  bifrost: [
    '0x9f28c6a68e0fc9646eff64935684f6eeeece527e37bbe1f213d22caa1d9d6bed'
  ],
  centrifuge: [
    '0x67dddf2673b69e5f875f6f25277495834398eafd67f492e09f3f3345e003d1b5'
  ],
  'dock-mainnet': [
    '0xf73467c6544aa68df2ee546b135f955c46b90fa627e9b5d7935f41061bb8a5a9'
  ],
  edgeware: [
    '0x742a2ca70c2fda6cee4f8df98d64c4c670a052d9568058982dad9d5a7a135c5b'
  ],
  equilibrium: [
    '0x6f1a800de3daff7f5e037ddf66ab22ce03ab91874debeddb1086f5f7dbd48925'
  ],
  genshiro: [
    '0x9b8cefc0eb5c568b527998bdd76c184e2b76ae561be76e4667072230217ea243'
  ],
  hydradx: [
    '0xd2a620c27ec5cbc5621ff9a522689895074f7cca0d08e7134a7804e1a3ba86fc', // Snakenet Gen3-1
    '0x10af6e84234477d84dc572bac0789813b254aa490767ed06fb9591191d1073f9', // Snakenet Gen3
    '0x3d75507dd46301767e601265791da1d9cb47b6ebc94e87347b635e5bf58bd047', // Snakenet Gen2
    '0x0ed32bfcab4a83517fac88f2aa7cbc2f88d3ab93be9a12b6188a036bf8a943c2' // Snakenet Gen1
  ],
  karura: [
    '0xbaf5aabe40646d11f0ee8abbdc64f4a4b7674925cba08e4a05ff9ebed6e2126b'
  ],
  kulupu: [
    '0xf7a99d3cb92853d00d5275c971c132c074636256583fee53b3bbe60d7b8769ba'
  ],
  kusama: [
    '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe', // Kusama CC3,
    '0xe3777fa922cafbff200cadeaea1a76bd7898ad5b89f7848999058b50e715f636', // Kusama CC2
    '0x3fd7b9eb6a00376e5be61f01abb429ffb0b104be05eaff4d458da48fcd425baf' // Kusama CC1
  ],
  'nodle-chain': [
    '0xa3d114c2b8d0627c1aa9b134eafcf7d05ca561fdc19fb388bb9457f81809fb23'
  ],
  picasso: [
    '0xe8e7f0f4c4f5a00720b4821dbfddefea7490bcf0b19009961cc46957984e2c1c'
  ],
  plasm: [
    '0x3e86364d4b4894021cb2a0390bcf2feb5517d5292f2de2bb9404227e908b0b8b'
  ],
  polkadot: [
    '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'
  ],
  polymesh: [
    '0x6fbd74e5e1d0a61d52ccfe9d4adaed16dd3a7caa37c6bc4d0c2fa12e8b2f4063'
  ],
  sora: [
    '0x7e4e32d0feafd4f9c9414b0be86373f9a1efa904809b683453a9af6856d38ad5'
  ],
  stafi: [
    '0x290a4149f09ea0e402c74c1c7e96ae4239588577fe78932f94f5404c68243d80'
  ],
  statemine: [
    '0x48239ef607d7928874027a43a67689209727dfb3d3dc5e5b03a39bdc2eda771a'
  ],
  subsocial: [
    '0x0bd72c1c305172e1275278aaeb3f161e02eccb7a819e63f62d47bd53a28189f8'
  ]
};

// these are icon overrides
export const knownIcon: KnownIcon = {
  centrifuge: 'polkadot',
  kusama: 'polkadot',
  polkadot: 'polkadot',
  sora: 'polkadot',
  statemine: 'polkadot',
  statemint: 'polkadot',
  westmint: 'polkadot'
};

// These match up with the keys of the ledgerApps object in the @polkadot/hw-ledger/defaults.ts
// and maps to the known slip44 (minus the `0x8` hard derivation flag)
// NOTE: Any network here needs to have a genesisHash attached in the config above
export const knownLedger: KnownLedger = {
  bifrost: 0x00000314,
  centrifuge: 0x000002eb,
  'dock-mainnet': 0x00000252,
  edgeware: 0x0000020b,
  equilibrium: 0x05f5e0fd,
  genshiro: 0x05f5e0fc,
  kusama: 0x000001b2,
  'nodle-chain': 0x000003eb,
  polkadot: 0x00000162,
  polymesh: 0x00000253,
  sora: 0x00000269,
  statemine: 0x000001b2 // common-good on Kusama, shares derivation
};

// testnets should not allow selection
export const knownTestnet: KnownTestnet = {
  '': true, // this is the default non-network entry
  'cess-testnet': true,
  'dock-testnet': true,
  jupiter: true,
  'mathchain-testnet': true,
  subspace_testnet: true,
  'zero-alphaville': true
};
