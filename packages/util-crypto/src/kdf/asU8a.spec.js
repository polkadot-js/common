// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { kdfAsU8a } = require('./index');

describe('kdfAsU8a', () => {
  it('generates known via specified salt & rounds', () => {
    const kdf = kdfAsU8a('test', 4, new Uint8Array(32));

    expect(
      kdf
    ).toEqual({
      key: new Uint8Array([103, 101, 136, 180, 146, 65, 105, 190, 91, 158, 187, 202, 45, 7, 115, 229, 215, 76, 8, 12, 185, 45, 25, 148, 98, 156, 53, 167, 51, 15, 26, 150]),
      rounds: 4,
      salt: new Uint8Array(32)
    });
  });

  it('defaults with rounds & random salt', () => {
    const kdf = kdfAsU8a(new Uint8Array(1, 2, 3, 4));

    expect(kdf.key).toHaveLength(32);
    expect(kdf.rounds).toEqual(16);
    expect(kdf.salt).not.toEqual(new Uint8Array(32));
  });

  it('does at least 1 round', () => {
    const kdf = kdfAsU8a(new Uint8Array(1, 2, 3, 4), -10);

    expect(kdf.rounds).toEqual(1);
  });
});
