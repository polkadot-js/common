// Copyright 2017-2018 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import pairsUniq from './pairsUniq';

describe('pairsUniq', () => {
  it('returns non-duplicated unchanged', () => {
    expect(
      pairsUniq([
        { k: new Uint8Array([0x1]), v: 'A' },
        { k: new Uint8Array([0x2]), v: 'B' }
      ])
    ).toEqual([
      { k: new Uint8Array([0x1]), v: 'A' },
      { k: new Uint8Array([0x2]), v: 'B' }
    ]);
  });

  it('removes duplicated pairs', () => {
    expect(
      pairsUniq([
        { k: new Uint8Array([0x1]), v: 'A' },
        { k: new Uint8Array([0x2]), v: 'B' },
        { k: new Uint8Array([0x1]), v: 'C' }
      ])
    ).toEqual([
      { k: new Uint8Array([0x1]), v: 'C' },
      { k: new Uint8Array([0x2]), v: 'B' }
    ]);
  });

  it('sorts pairs as returned', () => {
    expect(
      pairsUniq([
        { k: new Uint8Array([0x2]), v: 'B' },
        { k: new Uint8Array([0x1]), v: 'A' }
      ])
    ).toEqual([
      { k: new Uint8Array([0x1]), v: 'A' },
      { k: new Uint8Array([0x2]), v: 'B' }
    ]);
  });
});
