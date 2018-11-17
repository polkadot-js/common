// Copyright 2017-2018 @polkadot/trie-root authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { TriePair } from './types';

import { hexToU8a, stringToU8a } from '@polkadot/util/index';

type Data = {
  name: string,
  input: Array<TriePair>,
  output: Uint8Array,
  root: Uint8Array
};

const data: Array<Data> = [
  {
    name: 'a branch',
    input: [
      {
        k: Uint8Array.from([0xaa]),
        v: Uint8Array.from([0x10])
      },
      {
        k: Uint8Array.from([0xba]),
        v: Uint8Array.from([0x11])
      }
    ],
    output: Uint8Array.from([
      0xfe, 0x00, 0x0c, 0x10, 0x02, 0x0a, 0x04, 0x10, 0x10, 0x02, 0x0a, 0x4, 0x11
    ]),
    root: hexToU8a('0x922fa0ab17d1f383b45047502151d09e9141a76ddf5b5e4f1af98c4afdd85864')
  },
  {
    name: 'extension and branch',
    input: [
      {
        k: Uint8Array.from([0xaa]),
        v: Uint8Array.from([0x10])
      },
      {
        k: Uint8Array.from([0xab]),
        v: Uint8Array.from([0x11])
      }
    ],
    output: Uint8Array.from([
      0x81, 0x0a, 0x2c, 0xfe, 0x00, 0x0c, 0x0c, 0x01, 0x04, 0x10, 0x0c, 0x01, 0x04, 0x11
    ]),
    root: hexToU8a('0x3f6764bc812ca86b84cf88b2045828fd605c8abbe1e9c657ff87adb715c644bf')
  },
  {
    name: 'extension and branch with value',
    input: [
      {
        k: Uint8Array.from([0xaa]),
        v: Uint8Array.from([0xa0])
      },
      {
        k: Uint8Array.from([0xaa, 0xaa]),
        v: Uint8Array.from([0xaa])
      },
      {
        k: Uint8Array.from([0xaa, 0xbb]),
        v: Uint8Array.from([0xab])
      }
    ],
    output: Uint8Array.from([
      0x82, 0xaa, 0x3c, 0xff, 0x00, 0x0c, 0x04, 0xa0, 0x10, 0x02, 0x0a, 0x04, 0xaa, 0x10, 0x02, 0xb,
      0x04, 0xab
    ]),
    root: hexToU8a('0xc896ef26cd64107bd8bf33e9e0b0adbb29c54ac1bf8e9dc30153f13638095108')
  },
  {
    name: 'bigger extension and branch with value',
    input: [
      {
        k: Uint8Array.from([0xaa]),
        v: Uint8Array.from([0xa0])
      },
      {
        k: Uint8Array.from([0xaa, 0xaa]),
        v: Uint8Array.from([0xaa])
      },
      {
        k: Uint8Array.from([0xaa, 0xbb]),
        v: Uint8Array.from([0xab])
      },
      {
        k: Uint8Array.from([0xbb]),
        v: Uint8Array.from([0xb0])
      },
      {
        k: Uint8Array.from([0xbb, 0xbb]),
        v: Uint8Array.from([0xbb])
      },
      {
        k: Uint8Array.from([0xbb, 0xcc]),
        v: Uint8Array.from([0xbc])
      }
    ],
    output: Uint8Array.from([
      0xfe, 0x00, 0x0c, 0x48, 0x81, 0x0a, 0x3c, 0xff, 0x00, 0x0c, 0x04, 0xa0, 0x10, 0x02, 0x0a, 0x04,
      0xaa, 0x10, 0x02, 0x0b, 0x04, 0xab, 0x48, 0x81, 0x0b, 0x3c, 0xff, 0x00, 0x18, 0x04, 0xb0, 0x10,
      0x02, 0x0b, 0x4, 0xbb, 0x10, 0x2, 0xc, 0x4, 0xbc
    ]),
    root: hexToU8a('0x519056dadff78abc057f6de56706d7b0ed01654b059df3dd9cfc135ef246dd22')
  },
  {
    name: 'a single long leaf',
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
  {
    name: 'two long leaves',
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
  {
    name: 'empty into [0]',
    input: [],
    output: Uint8Array.from([
      0
    ]),
    root: hexToU8a('0x03170a2e7597b7b7e3d84c05391d139a62b157e78786d8c082f29dcf4c111314')
  },
  {
    name: 'a single tuple',
    input: [
      {
        k: Uint8Array.from([0xaa]),
        v: Uint8Array.from([0xbb])
      }
    ],
    output: Uint8Array.from([
      0x03,   // leaf (0x01) with (+) key of 2 nibbles (0x02)
      0xaa,   // key data
      1 << 2, // length of value in bytes as Compact
      0xbb    // value data
    ]),
    root: hexToU8a('0xe778a32590ed4f3f39608b77af87fb59163a89bb9702f477375e1a574736d6f0')
  },
  {
    name: '2 disjointed tuple keys',
    input: [
      {
        k: Uint8Array.from([0x48, 0x19]),
        v: Uint8Array.from([0xfe])
      },
      {
        k: Uint8Array.from([0x13, 0x14]),
        v: Uint8Array.from([0xff])
      }
    ],
    output: Uint8Array.from([
      0xfe,      // branch, no value
      0x12,      // slots 1 & 4 are taken from 0-7
      0x00,      // no slots from 8-15
      0x05 << 2, // first slot: LEAF, 5 bytes long.
      0x04,      // leaf with 3 nibbles
      0x03,      // first nibble
      0x14,      // second & third nibble
      0x01 << 2, // 1 byte data
      0xff,      // value data
      0x05 << 2, // second slot: LEAF, 5 bytes long.
      0x04,      // leaf with 3 nibbles
      0x08,      // first nibble
      0x19,      // second & third nibble
      0x01 << 2, // 1 byte data
      0xfe       // data
    ]),
    root: hexToU8a('0x72813a09bf563fdb6af1d8326329950499fc33c30f3534893381517dc54640b2')
  }
];

export default data;
