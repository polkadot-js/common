// Copyright 2017-2024 @polkadot/networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KnownGenesis } from '../types.js';

// In the case where the network was hard-spooned and multiple genesisHashes
// are provided, it needs to be in reverse order, i.e. most-recent goes first,
// oldest goes last. This make lookups for the current a simple genesisHash[0]
// where the latest ios always the first entry (See Kusama as an example)
//
// IMPORTANT: Apart from the test relays, this list is limited to live parachains
// and live production  networks. It does not and should not contain any testnets,
// either stand-alone or connected to test relays such as Westend/Rococo
export const knownGenesis: KnownGenesis = {
  acala: [
    '0xfc41b9bd8ef8fe53d58c7ea67c794c7ec9a73daf05e6d54b14ff6342c99ba64c'
  ],
  ajuna: [
    '0xe358eb1d11b31255a286c12e44fe6780b7edb171d657905a97e39f71d9c6c3ee'
  ],
  'aleph-node': [
    '0x70255b4d28de0fc4e1a193d7e175ad1ccef431598211c55538f1018651a0344e'
  ],
  astar: [
    '0x9eb76c5184c4ab8679d2d5d819fdf90b9c001403e9e17da2e14b6d8aec4029c6'
  ],
  basilisk: [
    '0xa85cfb9b9fd4d622a5b28289a02347af987d8f73fa3108450e2b4a11c1ce5755'
  ],
  bifrost: [
    '0x262e1b2ad728475fd6fe88e62d34c200abe6fd693931ddad144059b1eb884e5b'
  ],
  'bifrost-kusama': [
    '0x9f28c6a68e0fc9646eff64935684f6eeeece527e37bbe1f213d22caa1d9d6bed'
  ],
  bittensor: [
    '0x2f0555cc76fc2840a25a6ea3b9637146806f1f44b090c175ffde2a7e5ab36c03'
  ],
  centrifuge: [
    '0xb3db41421702df9a7fcac62b53ffeac85f7853cc4e689e0b93aeb3db18c09d82',
    '0x67dddf2673b69e5f875f6f25277495834398eafd67f492e09f3f3345e003d1b5'
  ],
  cere: [
    '0x81443836a9a24caaa23f1241897d1235717535711d1d3fe24eae4fdc942c092c'
  ],
  composable: [
    '0xdaab8df776eb52ec604a5df5d388bb62a050a0aaec4556a64265b9d42755552d'
  ],
  darwinia: [
    '0xe71578b37a7c799b0ab4ee87ffa6f059a6b98f71f06fb8c84a8d88013a548ad6'
  ],
  'dock-mainnet': [
    '0x6bfe24dca2a3be10f22212678ac13a6446ec764103c0f3471c71609eac384aae',
    '0xf73467c6544aa68df2ee546b135f955c46b90fa627e9b5d7935f41061bb8a5a9'
  ],
  edgeware: [
    '0x742a2ca70c2fda6cee4f8df98d64c4c670a052d9568058982dad9d5a7a135c5b'
  ],
  encointer: [
    '0x7dd99936c1e9e6d1ce7d90eb6f33bea8393b4bf87677d675aa63c9cb3e8c5b5b'
  ],
  enjin: [
    '0xd8761d3c88f26dc12875c00d3165f7d67243d56fc85b4cf19937601a7916e5a9'
  ],
  equilibrium: [
    '0x6f1a800de3daff7f5e037ddf66ab22ce03ab91874debeddb1086f5f7dbd48925'
  ],
  genshiro: [
    '0x9b8cefc0eb5c568b527998bdd76c184e2b76ae561be76e4667072230217ea243'
  ],
  hydradx: [
    '0xafdc188f45c71dacbaa0b62e16a91f726c7b8699a9748cdf715459de6b7f366d', // Hydration | HydraDX Parachain
    '0xd2a620c27ec5cbc5621ff9a522689895074f7cca0d08e7134a7804e1a3ba86fc', // Snakenet Gen3-1
    '0x10af6e84234477d84dc572bac0789813b254aa490767ed06fb9591191d1073f9', // Snakenet Gen3
    '0x3d75507dd46301767e601265791da1d9cb47b6ebc94e87347b635e5bf58bd047', // Snakenet Gen2
    '0x0ed32bfcab4a83517fac88f2aa7cbc2f88d3ab93be9a12b6188a036bf8a943c2' // Snakenet Gen1
  ],
  integritee: [
    '0xcdedc8eadbfa209d3f207bba541e57c3c58a667b05a2e1d1e86353c9000758da', // on Kusama
    '0xe13e7af377c64e83f95e0d70d5e5c3c01d697a84538776c5b9bbe0e7d7b6034c' // on Polkadot
  ],
  'interlay-parachain': [
    '0xbf88efe70e9e0e916416e8bed61f2b45717f517d7f3523e33c7b001e5ffcbc72'
  ],
  karura: [
    '0xbaf5aabe40646d11f0ee8abbdc64f4a4b7674925cba08e4a05ff9ebed6e2126b'
  ],
  khala: [
    '0xd43540ba6d3eb4897c28a77d48cb5b729fea37603cbbfc7a86a73b72adb3be8d'
  ],
  kulupu: [
    '0xf7a99d3cb92853d00d5275c971c132c074636256583fee53b3bbe60d7b8769ba'
  ],
  kusama: [
    '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe', // Kusama CC3,
    '0xe3777fa922cafbff200cadeaea1a76bd7898ad5b89f7848999058b50e715f636', // Kusama CC2
    '0x3fd7b9eb6a00376e5be61f01abb429ffb0b104be05eaff4d458da48fcd425baf' // Kusama CC1
  ],
  matrixchain: [
    '0x3af4ff48ec76d2efc8476730f423ac07e25ad48f5f4c9dc39c778b164d808615'
  ],
  nodle: [
    '0x97da7ede98d7bad4e36b4d734b6055425a3be036da2a332ea5a7037656427a21'
  ],
  origintrail: [
    '0xe7e0962324a3b86c83404dbea483f25fb5dab4c224791c81b756cfc948006174'
  ],
  p3d: [
    '0x6c5894837ad89b6d92b114a2fb3eafa8fe3d26a54848e3447015442cd6ef4e66'
  ],
  parallel: [
    '0xe61a41c53f5dcd0beb09df93b34402aada44cb05117b71059cce40a2723a4e97'
  ],
  peaq: [
    '0xd2a5d385932d1f650dae03ef8e2748983779ee342c614f80854d32b8cd8fa48c'
  ],
  pendulum: [
    '0x5d3c298622d5634ed019bf61ea4b71655030015bde9beb0d6a24743714462c86'
  ],
  phala: [
    '0x1bb969d85965e4bb5a651abbedf21a54b6b31a21f66b5401cc3f1e286268d736'
  ],
  picasso: [
    '0x6811a339673c9daa897944dcdac99c6e2939cc88245ed21951a0a3c9a2be75bc',
    '0xe8e7f0f4c4f5a00720b4821dbfddefea7490bcf0b19009961cc46957984e2c1c'
  ],
  polkadex: [
    '0x3920bcb4960a1eef5580cd5367ff3f430eef052774f78468852f7b9cb39f8a3c'
  ],
  polkadot: [
    '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3'
  ],
  polymesh: [
    '0x6fbd74e5e1d0a61d52ccfe9d4adaed16dd3a7caa37c6bc4d0c2fa12e8b2f4063'
  ],
  quartz: [
    '0xcd4d732201ebe5d6b014edda071c4203e16867305332301dc8d092044b28e554'
  ],
  rococo: [
    '0x6408de7737c59c238890533af25896a2c20608d8b380bb01029acb392781063e',
    '0xaaf2cd1b74b5f726895921259421b534124726263982522174147046b8827897',
    '0x037f5f3c8e67b314062025fc886fcd6238ea25a4a9b45dce8d246815c9ebe770',
    '0xc196f81260cf1686172b47a79cf002120735d7cb0eb1474e8adce56618456fff',
    '0xf6e9983c37baf68846fedafe21e56718790e39fb1c582abc408b81bc7b208f9a',
    '0x5fce687da39305dfe682b117f0820b319348e8bb37eb16cf34acbf6a202de9d9',
    '0xe7c3d5edde7db964317cd9b51a3a059d7cd99f81bdbce14990047354334c9779',
    '0x1611e1dbf0405379b861e2e27daa90f480b2e6d3682414a80835a52e8cb8a215',
    '0x343442f12fa715489a8714e79a7b264ea88c0d5b8c66b684a7788a516032f6b9',
    '0x78bcd530c6b3a068bc17473cf5d2aff9c287102bed9af3ae3c41c33b9d6c6147',
    '0x47381ee0697153d64404fc578392c8fd5cba9073391908f46c888498415647bd',
    '0x19c0e4fa8ab75f5ac7865e0b8f74ff91eb9a100d336f423cd013a8befba40299'
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
  statemint: [
    '0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f'
  ],
  subsocial: [
    '0x0bd72c1c305172e1275278aaeb3f161e02eccb7a819e63f62d47bd53a28189f8'
  ],
  ternoa: [
    '0x6859c81ca95ef624c9dfe4dc6e3381c33e5d6509e35e147092bfbc780f777c4e'
  ],
  unique: [
    '0x84322d9cddbf35088f1e54e9a85c967a41a56a4f43445768125e61af166c7d31'
  ],
  vtb: [
    '0x286bc8414c7000ce1d6ee6a834e29a54c1784814b76243eb77ed0b2c5573c60f',
    '0x7483b89572fb2bd687c7b9a93b242d0b237f9aba463aba07ec24503931038aaa'
  ],
  westend: [
    '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e'
  ],
  xxnetwork: [
    '0x50dd5d206917bf10502c68fb4d18a59fc8aa31586f4e8856b493e43544aa82aa'
  ],
  zeitgeist: [
    '0x1bf2a2ecb4a868de66ea8610f2ce7c8c43706561b6476031315f6640fe38e060'
  ]
};
