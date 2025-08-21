// Copyright 2017-2025 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { waitReady } from '@polkadot/wasm-crypto';

import { perfWasm } from '../test/index.js';
import { DEFAULT_PARAMS } from './defaults.js';
import { scryptEncode } from './index.js';

// eslint-disable-next-line jest/no-export
export const KNOWN_TEST = 'testing, 123';

// eslint-disable-next-line jest/no-export
export const KNOWN_PASS = new Uint8Array([225, 18, 85, 30, 46, 178, 200, 63, 147, 225, 37, 46, 88, 224, 151, 132, 48, 206, 104, 234, 120, 112, 243, 198, 92, 52, 101, 127, 242, 22, 116, 55, 74, 29, 17, 197, 38, 191, 128, 39, 255, 119, 175, 113, 180, 252, 171, 10, 78, 93, 226, 7, 166, 120, 99, 198, 225, 158, 107, 132, 226, 73, 129, 35]);

// eslint-disable-next-line jest/no-export
export const KNOWN_SALT = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]);

describe('scryptEncode', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  for (const onlyJs of [false, true]) {
    describe(`onlyJs=${(onlyJs && 'true') || 'false'}`, (): void => {
      it('generates a known output', (): void => {
        expect(
          scryptEncode(KNOWN_TEST, KNOWN_SALT, undefined, onlyJs)
        ).toEqual({
          params: DEFAULT_PARAMS,
          password: KNOWN_PASS,
          salt: KNOWN_SALT
        });
      });
    });
  }

  perfWasm('scryptEncode', 4, (input, onlyJs) =>
    scryptEncode(input, input, undefined, onlyJs)
  );
});
