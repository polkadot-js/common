// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { stringToU8a } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import { perfWasm } from '../test/index.js';
import { ed25519PairFromSeed, ed25519Sign } from './index.js';

const PAIR = ed25519PairFromSeed(
  stringToU8a('12345678901234567890123456789012')
);

describe('ed25519Sign', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  for (const onlyJs of [false, true]) {
    describe(`onlyJs=${(onlyJs && 'true') || 'false'}`, (): void => {
      it('returns a valid signature for the message', (): void => {
        expect(
          ed25519Sign(
            new Uint8Array([0x61, 0x62, 0x63, 0x64]),
            PAIR,
            onlyJs
          )
        ).toEqual(
          new Uint8Array([28, 58, 206, 239, 249, 70, 59, 191, 166, 40, 219, 218, 235, 170, 25, 79, 10, 94, 9, 197, 34, 126, 1, 150, 246, 68, 28, 238, 36, 26, 172, 163, 168, 90, 202, 211, 126, 246, 57, 212, 43, 24, 88, 197, 240, 113, 118, 76, 37, 81, 91, 110, 236, 50, 144, 134, 100, 223, 220, 238, 34, 185, 211, 7])
        );
      });
    });
  }

  perfWasm('ed25519Sign', 250, (input, onlyJs) =>
    ed25519Sign(input, PAIR, onlyJs)
  );
});
