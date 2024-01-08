// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { waitReady } from '@polkadot/wasm-crypto';

import { keccakAsHex } from './index.js';

const BITS: (256 | 512)[] = [256, 512];

const value = 'test';
const result = {
  256: '9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658',
  512: '1e2e9fc2002b002d75198b7503210c05a1baac4560916a3c6d93bcce3a50d7f00fd395bf1647b9abb8d1afcc9c76c289b0c9383ba386a956da4b38934417789e'
};

describe('keccakAsHex', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  BITS.forEach((bitLength): void => {
    it('returns a prefixed hex representation', (): void => {
      expect(
        keccakAsHex(value, bitLength)
      ).toEqual(`0x${result[bitLength]}`);
    });
  });
});
