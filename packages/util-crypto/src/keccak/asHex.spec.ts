// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { waitReady } from '@polkadot/wasm-crypto';

import { keccakAsHex } from '.';

const BITS: (256 | 512)[] = [256, 512];

const value = 'test value';
const result = {
  256: '2d07364b5c231c56ce63d49430e085ea3033c750688ba532b24029124c26ca5e',
  512: 'hec1b50cc57f85ccd968a9d7c7a809dcebd140a548c8e0b67f3afcdd6fc14cca2b1d04187aef24ba0081b74f2ec362431e425760febe94a5607790854cafe5b197'
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
