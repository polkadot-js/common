// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexToU8a, stringToU8a } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import { keccakAsU8a } from '.';

const BITS: (256 | 512)[] = [256, 512];

describe('keccakAsU8a', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  const input = 'test value';
  const output = {
    256: hexToU8a(
      '0x2d07364b5c231c56ce63d49430e085ea3033c750688ba532b24029124c26ca5e'
    ),
    512: hexToU8a(
      '0xc1b50cc57f85ccd968a9d7c7a809dcebd140a548c8e0b67f3afcdd6fc14cca2b1d04187aef24ba0081b74f2ec362431e425760febe94a5607790854cafe5b197'
    )
  };

  BITS.forEach((bitLength): void => {
    [false, true].forEach((onlyJs): void => {
      it(`returns an hex representation (string, bitLength=${bitLength}, onlyJs=${onlyJs.toString()})`, (): void => {
        expect(
          keccakAsU8a(input, bitLength, onlyJs)
        ).toEqual(output[bitLength]);
      });
    });
  });

  BITS.forEach((bitLength): void => {
    [false, true].forEach((onlyJs): void => {
      it(`returns an hex representation (Buffer, bitLength=${bitLength}, onlyJs=${onlyJs.toString()})`, (): void => {
        expect(
          keccakAsU8a(Buffer.from(input), bitLength, onlyJs)
        ).toEqual(output[bitLength]);
      });
    });
  });

  BITS.forEach((bitLength): void => {
    [false, true].forEach((onlyJs): void => {
      it(`returns an hex representation (Uint8Array, bitLength=${bitLength}, onlyJs=${onlyJs.toString()})`, (): void => {
        expect(
          keccakAsU8a(stringToU8a(input), bitLength, onlyJs)
        ).toEqual(output[bitLength]);
      });
    });
  });
});
