// Copyright 2017-2020 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { TriePair } from '../src/types';

import { hexToU8a, stringToU8a } from '@polkadot/util';

export interface TestData {
  desc: string;
  input: TriePair[];
  output: Uint8Array;
  root: Uint8Array;
}

const data: { [index: string]: TestData } = {
  simpleBranch: {
    desc: 'a branch',
    input: [
      { k: Uint8Array.from([0xaa]), v: Uint8Array.from([0x10]) },
      { k: Uint8Array.from([0xba]), v: Uint8Array.from([0x11]) }
    ],
    output: Uint8Array.from([
      0xfe, 0x00, 0x0c, 0x10, 0x02, 0x0a, 0x04, 0x10, 0x10, 0x02, 0x0a, 0x04, 0x11
    ]),
    root: hexToU8a('0x922fa0ab17d1f383b45047502151d09e9141a76ddf5b5e4f1af98c4afdd85864')
  },
  extensionBranch: {
    desc: 'extension and branch',
    input: [
      { k: Uint8Array.from([0xaa]), v: Uint8Array.from([0x10]) },
      { k: Uint8Array.from([0xab]), v: Uint8Array.from([0x11]) }
    ],
    output: hexToU8a('0x810a2cfe000c0c0104100c010411'),
    root: hexToU8a('0x3f6764bc812ca86b84cf88b2045828fd605c8abbe1e9c657ff87adb715c644bf')
  },
  extensionBranchValue: {
    desc: 'extension and branch with value',
    input: [
      { k: Uint8Array.from([0xaa]), v: Uint8Array.from([0xa0]) },
      { k: Uint8Array.from([0xaa, 0xaa]), v: Uint8Array.from([0xaa]) },
      { k: Uint8Array.from([0xaa, 0xbb]), v: Uint8Array.from([0xab]) }
    ],
    output: Uint8Array.from([
      0x82, 0xaa, 0x3c, 0xff, 0x00, 0x0c, 0x04, 0xa0, 0x10, 0x02, 0x0a, 0x04, 0xaa, 0x10, 0x02, 0x0b,
      0x04, 0xab
    ]),
    root: hexToU8a('0xc896ef26cd64107bd8bf33e9e0b0adbb29c54ac1bf8e9dc30153f13638095108')
  },
  midExtensionBranchValue: {
    desc: 'medium extension and branch with value',
    input: [
      { k: Uint8Array.from([0xaa]), v: Uint8Array.from([0xa0]) },
      { k: Uint8Array.from([0xaa, 0xaa]), v: Uint8Array.from([0xaa]) },
      { k: Uint8Array.from([0xaa, 0xbb]), v: Uint8Array.from([0xab]) },
      { k: Uint8Array.from([0xbb]), v: Uint8Array.from([0xb0]) }
    ],
    output: Uint8Array.from([
      0xfe, 0x00, 0x0c, 0x48, 0x81, 0x0a, 0x3c, 0xff, 0x00, 0x0c, 0x04, 0xa0, 0x10, 0x02, 0x0a, 0x04,
      0xaa, 0x10, 0x02, 0x0b, 0x04, 0xab, 0x10, 0x02, 0x0b, 0x04, 0xb0
    ]),
    root: hexToU8a('0xd8272dfbf69d087664637b9c1773e20d82b1476c1c480e84f13cafbec4c5c92a')
  },
  bigExtensionBranchValue: {
    desc: 'bigger extension and branch with value',
    input: [
      { k: Uint8Array.from([0xaa]), v: Uint8Array.from([0xa0]) },
      { k: Uint8Array.from([0xaa, 0xaa]), v: Uint8Array.from([0xaa]) },
      { k: Uint8Array.from([0xaa, 0xbb]), v: Uint8Array.from([0xab]) },
      { k: Uint8Array.from([0xbb]), v: Uint8Array.from([0xb0]) },
      { k: Uint8Array.from([0xbb, 0xbb]), v: Uint8Array.from([0xbb]) },
      { k: Uint8Array.from([0xbb, 0xcc]), v: Uint8Array.from([0xbc]) }
    ],
    output: Uint8Array.from([
      0xfe, 0x00, 0x0c, 0x48, 0x81, 0x0a, 0x3c, 0xff, 0x00, 0x0c, 0x04, 0xa0, 0x10, 0x02, 0x0a, 0x04,
      0xaa, 0x10, 0x02, 0x0b, 0x04, 0xab, 0x48, 0x81, 0x0b, 0x3c, 0xff, 0x00, 0x18, 0x04, 0xb0, 0x10,
      0x02, 0x0b, 0x04, 0xbb, 0x10, 0x02, 0x0c, 0x04, 0xbc
    ]),
    root: hexToU8a('0x519056dadff78abc057f6de56706d7b0ed01654b059df3dd9cfc135ef246dd22')
  },
  longLeaf: {
    desc: 'a single long leaf',
    input: [
      {
        k: Uint8Array.from([0xaa]),
        v: stringToU8a('ABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABC')
      },
      {
        k: Uint8Array.from([0xba]),
        v: Uint8Array.from([0x11])
      }
    ],
    output: Uint8Array.from([
      0xfe, 0x00, 0x0c, 0x80, 0x0e, 0x26, 0xe9, 0x80, 0x0a, 0xc2, 0x7f, 0x56, 0x5c, 0x7e, 0x7c, 0xa7,
      0x95, 0x16, 0x24, 0x78, 0x35, 0xea, 0x07, 0x6c, 0x5b, 0x62, 0x5f, 0x2d, 0x61, 0x00, 0x1a, 0x7b,
      0xab, 0xad, 0xbf, 0x11, 0x10, 0x02, 0x0a, 0x04, 0x11
    ]),
    root: hexToU8a('0x28530359d763dccdd0a6720aacdea9d03c4d93fa8b7c83e650ab159f1fa4675f')
  },
  twoLongLeaves: {
    desc: 'two long leaves',
    input: [
      {
        k: Uint8Array.from([0xaa]),
        v: stringToU8a('ABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABC')
      },
      {
        k: Uint8Array.from([0xba]),
        v: stringToU8a('ABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABC')
      }
    ],
    output: Uint8Array.from([
      0xfe, 0x00, 0x0c, 0x80, 0x0e, 0x26, 0xe9, 0x80, 0x0a, 0xc2, 0x7f, 0x56, 0x5c, 0x7e, 0x7c, 0xa7,
      0x95, 0x16, 0x24, 0x78, 0x35, 0xea, 0x07, 0x6c, 0x5b, 0x62, 0x5f, 0x2d, 0x61, 0x00, 0x1a, 0x7b,
      0xab, 0xad, 0xbf, 0x11, 0x80, 0x0e, 0x26, 0xe9, 0x80, 0x0a, 0xc2, 0x7f, 0x56, 0x5c, 0x7e, 0x7c,
      0xa7, 0x95, 0x16, 0x24, 0x78, 0x35, 0xea, 0x07, 0x6c, 0x5b, 0x62, 0x5f, 0x2d, 0x61, 0x00, 0x1a,
      0x7b, 0xab, 0xad, 0xbf, 0x11
    ]),
    root: hexToU8a('0x413f72e84d4f48fba427592529cd048244bf816141f17d6b5947965765e67824')
  },
  empty: {
    desc: 'empty into [0]',
    input: [],
    output: Uint8Array.from([0]),
    root: hexToU8a('0x03170a2e7597b7b7e3d84c05391d139a62b157e78786d8c082f29dcf4c111314')
  },
  singleValue: {
    desc: 'a single tuple',
    input: [
      { k: Uint8Array.from([0xaa]), v: Uint8Array.from([0xbb]) }
    ],
    output: Uint8Array.from([
      0x03, // leaf (0x01) with (+) key of 2 nibbles (0x02)
      0xaa, // key data
      1 << 2, // length of value in bytes as Compact
      0xbb // value data
    ]),
    root: hexToU8a('0xe778a32590ed4f3f39608b77af87fb59163a89bb9702f477375e1a574736d6f0')
  },
  singleValue2: {
    desc: 'a single tuple (prepare for next)',
    input: [
      { k: Uint8Array.from([0x48, 0x19]), v: Uint8Array.from([0xfe]) }
    ],
    output: Uint8Array.from([
      0x05, 0x48, 0x19, 0x04, 0xfe
    ]),
    root: hexToU8a('0xfb05396ab039474785c95dcb40339f52a45ea5d5bc8c1f76d7e4308b90124357')
  },
  twoValues: {
    desc: '2 disjointed tuple keys',
    input: [
      { k: Uint8Array.from([0x48, 0x19]), v: Uint8Array.from([0xfe]) },
      { k: Uint8Array.from([0x13, 0x14]), v: Uint8Array.from([0xff]) }
    ],
    output: Uint8Array.from([
      0xfe, // branch, no value
      0x12, // slots 1 & 4 are taken from 0-7
      0x00, // no slots from 8-15
      0x05 << 2, // first slot: LEAF, 5 bytes long.
      0x04, // leaf with 3 nibbles
      0x03, // first nibble
      0x14, // second & third nibble
      0x01 << 2, // 1 byte data
      0xff, // value data
      0x05 << 2, // second slot: LEAF, 5 bytes long.
      0x04, // leaf with 3 nibbles
      0x08, // first nibble
      0x19, // second & third nibble
      0x01 << 2, // 1 byte data
      0xfe // data
    ]),
    root: hexToU8a('0x72813a09bf563fdb6af1d8326329950499fc33c30f3534893381517dc54640b2')
  },
  substrate0: {
    desc: 'substrate (paritial 0)',
    input: [
      {
        k: hexToU8a('0x3a617574683a00000000'),
        v: hexToU8a('0x82c39b31a2b79a90f8e66e7a77fdb85a4ed5517f2ae39f6a80565e8ecae85cf5')
      },
      {
        k: hexToU8a('0x7935e46f94f24b82716c0142e2271de9'),
        v: hexToU8a('0x0087000000000000')
      },
      {
        k: hexToU8a('0x27b3872d47181b4a2dc15f0da43e7026'),
        v: hexToU8a('0xe803000000000000')
      }
    ],
    output: hexToU8a(
      '0xfe8c00682007b3872d47181b4a2dc15f0da43e702620e80300000000000080170d322ac49d8708f151346c68d9e58452d83a9d3b710e1ead35eb3269ab235368200935e46f94f24b82716c0142e2271de9200087000000000000'
    ),
    root: hexToU8a('0xd1d7c0207562afecdb7e8cf945a402b19d378cb337a10535b1c4241454be9e21')
  }
};

export default data;
