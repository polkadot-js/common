// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isHex } from '@polkadot/util';

import { randomAsHex } from './index.js';

describe('randomAsBuffer', (): void => {
  it('generated results does not match', (): void => {
    expect(
      randomAsHex()
    ).not.toEqual(
      randomAsHex()
    );
  });

  it('is a valid hex number', (): void => {
    expect(
      isHex(
        randomAsHex()
      )
    ).toEqual(true);
  });

  it('generates 32 bytes by default', (): void => {
    expect(
      randomAsHex()
    ).toHaveLength(32 * 2 + 2);
  });

  it('generates with the supplied length', (): void => {
    expect(
      randomAsHex(66)
    ).toHaveLength(66 * 2 + 2);
  });
});
