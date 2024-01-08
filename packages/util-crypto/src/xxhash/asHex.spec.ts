// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { waitReady } from '@polkadot/wasm-crypto';

import { xxhashAsHex } from './index.js';

describe('xxhashAsHex', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  for (const onlyJs of [false, true]) {
    describe(`onlyJs=${(onlyJs && 'true') || 'false'}`, (): void => {
      it('returns a 64-bit value by default', (): void => {
        expect(
          xxhashAsHex('abc', undefined, onlyJs)
        ).toEqual('0x990977adf52cbc44');
      });

      it('returns a 128-bit value (as specified)', (): void => {
        expect(
          xxhashAsHex('abc', 128, onlyJs)
        ).toEqual('0x990977adf52cbc440889329981caa9be');
      });

      it('returns a 256-bit value (as specified)', (): void => {
        expect(
          xxhashAsHex('abc', 256, onlyJs)
        ).toEqual('0x990977adf52cbc440889329981caa9bef7da5770b2b8a05303b75d95360dd62b');
      });
    });
  }
});
