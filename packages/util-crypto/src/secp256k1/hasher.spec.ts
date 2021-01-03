// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { secp256k1Hasher } from './hasher';

describe('secp256k1Hasher', (): void => {
  it('fails with unknown hasher', (): void => {
    expect(
      () => secp256k1Hasher('unknown' as 'blake2', 'testing')
    ).toThrow(/Unsupported secp256k1 hasher 'unknown', expected one of blake2, keccak/);
  });

  it('creates a blake2 hash', (): void => {
    expect(
      secp256k1Hasher('blake2', 'abc')
    ).toEqual(
      new Uint8Array([189, 221, 129, 60, 99, 66, 57, 114, 49, 113, 239, 63, 238, 152, 87, 155, 148, 150, 78, 59, 177, 203, 62, 66, 114, 98, 200, 192, 104, 213, 35, 25])
    );
  });

  it('creates a keccak hash', (): void => {
    expect(
      secp256k1Hasher('keccak', 'abc')
    ).toEqual(
      new Uint8Array([78, 3, 101, 122, 234, 69, 169, 79, 199, 212, 123, 168, 38, 200, 214, 103, 192, 209, 230, 227, 58, 100, 160, 54, 236, 68, 245, 143, 161, 45, 108, 69])
    );
  });
});
