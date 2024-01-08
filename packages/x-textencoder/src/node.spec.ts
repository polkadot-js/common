// Copyright 2017-2024 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { xglobal } from '@polkadot/x-global';

// @ts-expect-error Clearing this, it is obviously not valid in normal code
xglobal.TextEncoder = undefined;

describe('TextEncoder (node)', (): void => {
  let TE: typeof TextEncoder;

  beforeEach(async (): Promise<void> => {
    const node = await import('./node.js');

    TE = node.TextEncoder;
  });

  it('encodes correctly', (): void => {
    expect(
      new TE().encode('abc')
    ).toEqual(new Uint8Array([97, 98, 99]));
  });
});
