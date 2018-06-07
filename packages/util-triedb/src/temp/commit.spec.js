// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const memory = require('./index')();

describe('commit', () => {
  const k1 = new Uint8Array([1]);
  const k2 = new Uint8Array([2]);
  const v1 = new Uint8Array([9]);
  const v2 = new Uint8Array([8]);

  beforeEach(() => {
    memory.commit([
      { k: k1, v: v1 }
    ]);
  });

  it('sets values to back-end', () => {
    expect(
      memory.get(k1)
    ).toEqual(v1);
  });

  it('removes empty values from storage', () => {
    memory.commit([
      { k: k1, v: null },
      { k: k2, v: v2 }
    ]);

    expect(
      memory.get(k1)
    ).toEqual(null);
    expect(
      memory.get(k2)
    ).toEqual(v2);
    expect(
      memory.pairs()
    ).toEqual([
      { k: k2, v: v2 }
    ]);
  });

  it('ignores empty values, not in storage', () => {
    memory.commit([
      { k: k2, v: null }
    ]);

    expect(
      memory.get(k2)
    ).toEqual(null);
  });

  it('ignores empty array', () => {
    memory.commit();

    expect(
      memory.get(k1)
    ).toEqual(v1);
  });
});
