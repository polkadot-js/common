// Copyright 2017-2020 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { hexToU8a } from '@polkadot/util';

import encode from './encode';

describe('encoding', (): void => {
  it('encode a small sub-tree', (): void => {
    expect(
      encode([
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        [
          Uint8Array.from([58]),
          Uint8Array.from([170])
        ],
        null,
        null,
        null,
        null,
        null,
        Uint8Array.from([160])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any)
    ).toEqual(Uint8Array.from([
      255, 0, 4, 4, 160, 16, 2, 10, 4, 170
    ]));
  });

  it('encodes a sub-tree', (): void => {
    expect(
      encode([
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        [
          Uint8Array.from([58]),
          Uint8Array.from([170])
        ],
        [
          Uint8Array.from([59]),
          Uint8Array.from([171])
        ],
        null,
        null,
        null,
        null,
        Uint8Array.from([160])
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any)
    ).toEqual(Uint8Array.from([
      255, 0, 12, 4, 160, 16, 2, 10, 4, 170, 16, 2, 11, 4, 171
    ]));
  });

  it('encodes a complex tree (with hash)', (): void => {
    expect(
      encode([
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any)
    ).toEqual(hexToU8a(
      '0xfe8c00682007b3872d47181b4a2dc15f0da43e702620e80300000000000080170d322ac49d8708f151346c68d9e58452d83a9d3b710e1ead35eb3269ab235368200935e46f94f24b82716c0142e2271de9200087000000000000'
    ));
  });
});
