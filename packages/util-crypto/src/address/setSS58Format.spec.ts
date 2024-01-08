// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { encodeAddress, setSS58Format } from './index.js';

describe('setSS58Format', (): void => {
  beforeEach((): void => {
    // eslint-disable-next-line deprecation/deprecation
    setSS58Format(2);
  });

  it('sets and allows encoding using', (): void => {
    expect(
      encodeAddress(
        new Uint8Array([1])
      )
    ).toEqual('g4b');
  });
});
