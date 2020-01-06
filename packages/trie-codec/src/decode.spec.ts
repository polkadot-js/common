// Copyright 2017-2020 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { hexToU8a } from '@polkadot/util';

import decode from './decode';

describe('decode', (): void => {
  it('decodes a leaf', (): void => {
    expect(
      decode(Uint8Array.from([
        0x05, 0x48, 0x19, 0x04, 0xfe
      ]))
    ).toEqual([
      Uint8Array.from([0x20, 0x48, 0x19]),
      Uint8Array.from([0xfe])
    ]);
  });

  it('decodes a branch', (): void => {
    expect(
      decode(Uint8Array.from([
        0xfe, 0x00, 0x0c, 0x48, 0x81, 0x0a, 0x3c, 0xff, 0x00, 0x0c, 0x04, 0xa0, 0x10, 0x02, 0x0a, 0x04,
        0xaa, 0x10, 0x02, 0x0b, 0x04, 0xab, 0x10, 0x02, 0x0b, 0x04, 0xb0
      ]))
    ).toEqual([
      null, null, null, null, null, null, null, null, null, null,
      [
        Uint8Array.from([26]),
        Uint8Array.from([255, 0, 12, 4, 160, 16, 2, 10, 4, 170, 16, 2, 11, 4, 171])
      ],
      [
        Uint8Array.from([59]),
        Uint8Array.from([176])
      ],
      null, null, null, null, null
    ]);
  });

  it('decodes a complex branch', (): void => {
    expect(
      decode(hexToU8a(
        '0xfe8c00682007b3872d47181b4a2dc15f0da43e702620e80300000000000080170d322ac49d8708f151346c68d9e58452d83a9d3b710e1ead35eb3269ab235368200935e46f94f24b82716c0142e2271de9200087000000000000'
      ))
    ).toEqual([
      null,
      null,
      [
        hexToU8a('0x37b3872d47181b4a2dc15f0da43e7026'),
        hexToU8a('0xe803000000000000')
      ],
      Uint8Array.from([
        23, 13, 50, 42, 196, 157, 135, 8, 241, 81, 52, 108, 104, 217, 229, 132, 82, 216, 58, 157, 59, 113, 14, 30, 173, 53, 235, 50, 105, 171, 35, 83
      ]),
      null,
      null,
      null,
      [
        hexToU8a('0x3935e46f94f24b82716c0142e2271de9'),
        hexToU8a('0x0087000000000000')
      ],
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    ]);
  });
});
