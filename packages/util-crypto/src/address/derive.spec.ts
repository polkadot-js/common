// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { waitReady } from '@polkadot/wasm-crypto';

import { deriveAddress } from './index.js';

describe('deriveAddress', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  it('derives a known path', (): void => {
    expect(
      deriveAddress('5CZtJLXtVzrBJq1fMWfywDa6XuRwXekGdShPR4b8i9GWSbzB', '/joe/polkadot/0')
    ).toEqual('5GZ4srnepXvdsuNVoxCGyVZd8ScDm4gkGLTKuaGARy9akjTa');
  });

  it('fails on hard paths', (): void => {
    expect(
      () => deriveAddress('5CZtJLXtVzrBJq1fMWfywDa6XuRwXekGdShPR4b8i9GWSbzB', '//bob')
    ).toThrow(/Expected suri to contain a combination of non-hard paths/);
  });
});
