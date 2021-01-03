// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { waitReady } from '@polkadot/wasm-crypto';

import { deriveAddress } from '.';

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
