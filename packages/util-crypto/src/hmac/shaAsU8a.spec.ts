// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { hexToU8a, stringToU8a } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import { perfWasm } from '../test/index.js';
import { hmacShaAsU8a } from './index.js';

describe('hmacShaAsU8a', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  const key = stringToU8a('secret');
  const data = stringToU8a('some message');
  const output = {
    256: hexToU8a(
      '0xf28a70b41263840e5c059a0a733336e0957efba87902aa8cca11441d4b0c96d7'
    ),
    512: hexToU8a(
      '0x295832e97ed77be75a9fa98029497e4a722c4b9a2f21b39d34f1befa931a39ec520fd24711d6f5c03501384ea66b83066a01a82c57a0460f8cd1f471fcce5841'
    )
  };

  for (const bitLength of [256, 512] as const) {
    describe(`bitLength=${bitLength}`, (): void => {
      for (const onlyJs of [false, true]) {
        describe(`onlyJs=${(onlyJs && 'true') || 'false'}`, (): void => {
          it('returns an hex representation (string)', (): void => {
            expect(
              hmacShaAsU8a(key, data, bitLength, onlyJs)
            ).toEqual(output[bitLength]);
          });
        });
      }
    });

    perfWasm(`hmacShaAsU8a, bitLength=${bitLength}`, 16000, (input, onlyJs) =>
      hmacShaAsU8a(input, input, bitLength, onlyJs)
    );
  }
});
