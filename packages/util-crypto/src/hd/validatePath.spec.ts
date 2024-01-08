// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { hdValidatePath } from './index.js';

const VECTORS: [string, boolean][] = [
  ["m/44'/60'/0'/0/0", true],
  ['m/0', true],
  ["m/123'", true],
  ["n/44'/60'/0'/0/0", false],
  ['m', false],
  ['m/', false],
  ["m/xyz'", false],
  ['m/123x', false],
  ['m/123"', false],
  ["m/123''", false],
  ["m/123'0'", false],
  [`m/${0x80000000}`, false],
  ['m/-1', false]
];

describe('hdValidatePath', (): void => {
  VECTORS.forEach(([path, result]): void => {
    it(`validates ${path} as ${result.toString()}`, (): void => {
      expect(hdValidatePath(path)).toEqual(result);
    });
  });
});
