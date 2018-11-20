// Copyright 2017-2018 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import encode from './encode';

describe('encoding', () => {
  it('encode a small sub-tree', () => {
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
          Uint8Array.from([ 58 ]),
          Uint8Array.from([ 170 ])
        ],
        null,
        null,
        null,
        null,
        null,
        Uint8Array.from([ 160 ])
      ] as any)
    ).toEqual(Uint8Array.from([
      255, 0, 4, 4, 160, 16, 2, 10, 4, 170
    ]));
  });

  it('encodes a sub-tree', () => {
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
          Uint8Array.from([ 58 ]),
          Uint8Array.from([ 170 ])
        ],
        [
          Uint8Array.from([ 59 ]),
          Uint8Array.from([ 171 ])
        ],
        null,
        null,
        null,
        null,
        Uint8Array.from([ 160 ])
      ] as any)
    ).toEqual(Uint8Array.from([
      255, 0, 12, 4, 160, 16, 2, 10, 4, 170, 16, 2, 11, 4, 171
    ]));
  });
});
