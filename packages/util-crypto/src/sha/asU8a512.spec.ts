// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { waitReady } from '@polkadot/wasm-crypto';

import { performanceWasm } from '../test/performance';
import { sha512AsU8a } from '.';

describe('sha512AsU8a', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  describe.each([false, true])('onlyJs=%p', (onlyJs): void => {
    it('creates a sha-512 hash', (): void => {
      expect(
        sha512AsU8a(Uint8Array.from([0x61, 0x62, 0x63, 0x64]), onlyJs)
      ).toEqual(
        Uint8Array.from([
          216, 2, 47, 32, 96, 173, 110, 253, 41, 122, 183, 61, 204, 83, 85, 201, 178, 20, 5, 75, 13, 23, 118, 161, 54, 166, 105, 210, 106, 125, 59, 20, 247, 58, 160, 208, 235, 255, 25, 238, 51, 51, 104, 240, 22, 75, 100, 25, 169, 109, 164, 158, 62, 72, 23, 83, 231, 233, 107, 113, 107, 220, 203, 111
        ])
      );
    });
  });

  performanceWasm('sha512AsU8a', 64000, (input, onlyJs) =>
    sha512AsU8a(input, onlyJs)
  );
});
