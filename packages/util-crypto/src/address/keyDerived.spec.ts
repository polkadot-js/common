// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { createKeyDerived } from './index.js';

describe('createKeyDerived', (): void => {
  it('matches sub accounts with Rust', (): void => {
    expect(
      createKeyDerived(new Uint8Array([1, 0, 0, 0, 0, 0, 0, 0]), 0)
    ).toEqual(
      new Uint8Array([234, 236, 28, 96, 177, 168, 152, 193, 71, 179, 226, 102, 179, 155, 188, 240, 90, 182, 21, 175, 47, 47, 250, 179, 178, 0, 81, 222, 70, 56, 52, 234])
    );
  });

  it('creates a valid subkey', (): void => {
    expect(
      createKeyDerived('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', 1)
    ).toEqual(
      new Uint8Array([248, 19, 86, 209, 254, 89, 84, 48, 54, 128, 166, 239, 153, 212, 143, 34, 191, 60, 210, 50, 39, 77, 122, 71, 29, 60, 247, 198, 95, 101, 246, 83])
    );
  });
});
