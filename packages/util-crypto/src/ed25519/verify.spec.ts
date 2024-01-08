// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { stringToU8a } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import { ed25519PairFromSeed, ed25519Verify } from './index.js';

describe('ed25519Verify', (): void => {
  let publicKey: Uint8Array;
  let signature: Uint8Array;

  beforeEach(async (): Promise<void> => {
    await waitReady();

    publicKey = ed25519PairFromSeed(
      stringToU8a('12345678901234567890123456789012')
    ).publicKey;
    signature = new Uint8Array([28, 58, 206, 239, 249, 70, 59, 191, 166, 40, 219, 218, 235, 170, 25, 79, 10, 94, 9, 197, 34, 126, 1, 150, 246, 68, 28, 238, 36, 26, 172, 163, 168, 90, 202, 211, 126, 246, 57, 212, 43, 24, 88, 197, 240, 113, 118, 76, 37, 81, 91, 110, 236, 50, 144, 134, 100, 223, 220, 238, 34, 185, 211, 7]);
  });

  for (const onlyJs of [false, true]) {
    describe(`onlyJs=${(onlyJs && 'true') || 'false'}`, (): void => {
      it('validates a correctly signed message', (): void => {
        expect(
          ed25519Verify(
            new Uint8Array([0x61, 0x62, 0x63, 0x64]),
            signature,
            publicKey,
            onlyJs
          )
        ).toEqual(true);
      });

      it('fails a correctly signed message (message changed)', (): void => {
        expect(
          ed25519Verify(
            new Uint8Array([0x61, 0x62, 0x63, 0x64, 0x65]),
            signature,
            publicKey,
            onlyJs
          )
        ).toEqual(false);
      });

      it('fails a correctly signed message (signature changed)', (): void => {
        signature[0] = 0xff;

        expect(
          ed25519Verify(
            new Uint8Array([0x61, 0x62, 0x63, 0x64]),
            signature,
            publicKey,
            onlyJs
          )
        ).toEqual(false);
      });

      it('throws error when publicKey lengths do not match', (): void => {
        expect(
          () => ed25519Verify(
            new Uint8Array([0x61, 0x62, 0x63, 0x64]),
            signature,
            new Uint8Array([1, 2]),
            onlyJs
          )
        ).toThrow(/Invalid publicKey/);
      });

      it('throws error when signature lengths do not match', (): void => {
        expect(
          () => ed25519Verify(
            new Uint8Array([0x61, 0x62, 0x63, 0x64]),
            new Uint8Array([1, 2]),
            publicKey,
            onlyJs
          )
        ).toThrow(/Invalid signature/);
      });
    });
  }
});
