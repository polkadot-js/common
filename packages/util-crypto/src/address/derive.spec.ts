// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { waitReady } from '@polkadot/wasm-crypto';

import derive from './derive';

describe('deriveAddress', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  it('derives a known path', (): void => {
    expect(
      derive('5CZtJLXtVzrBJq1fMWfywDa6XuRwXekGdShPR4b8i9GWSbzB', '/joe/polkadot/0')
    ).toEqual('5GZ4srnepXvdsuNVoxCGyVZd8ScDm4gkGLTKuaGARy9akjTa');
  });

  it('fails on hard paths', (): void => {
    expect(
      () => derive('5CZtJLXtVzrBJq1fMWfywDa6XuRwXekGdShPR4b8i9GWSbzB', '//bob')
    ).toThrow(/Expected suri to contain a combination of non-hard paths/);
  });
});
