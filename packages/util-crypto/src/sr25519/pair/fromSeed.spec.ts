// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { stringToU8a, u8aToHex } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import { mnemonicToMiniSecret } from '../../mnemonic/index.js';
import { sr25519PairFromSeed } from '../index.js';
import tests from './testing.spec.js';

describe('sr25519PairFromSeed', (): void => {
  const TEST = stringToU8a('12345678901234567890123456789012');
  const RESULT = {
    publicKey: new Uint8Array([116, 28, 8, 160, 111, 65, 197, 150, 96, 143, 103, 116, 37, 155, 217, 4, 51, 4, 173, 250, 93, 62, 234, 98, 118, 11, 217, 190, 151, 99, 77, 99]),
    secretKey: new Uint8Array([240, 16, 102, 96, 195, 221, 162, 63, 22, 218, 169, 172, 91, 129, 27, 150, 48, 119, 245, 188, 10, 248, 159, 133, 128, 79, 13, 232, 228, 36, 240, 80, 249, 141, 102, 243, 148, 66, 80, 111, 249, 71, 253, 145, 31, 24, 199, 167, 165, 218, 99, 154, 99, 232, 211, 180, 226, 51, 247, 65, 67, 217, 81, 193])
  };

  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  it('generates a valid publicKey/secretKey pair (u8a)', (): void => {
    expect(
      sr25519PairFromSeed(TEST)
    ).toEqual(RESULT);
  });

  tests.forEach(([mnemonic, , , secret], index): void => {
    it(`creates valid against known (${index})`, (): void => {
      const seed = mnemonicToMiniSecret(mnemonic, 'Substrate');
      const pair = sr25519PairFromSeed(seed);

      expect(
        u8aToHex(pair.secretKey)
      ).toEqual(secret);
    });
  });
});
