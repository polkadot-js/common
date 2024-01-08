// Copyright 2017-2024 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { xglobal } from '@polkadot/x-global';

// @ts-expect-error Clearing this, it is obviously not valid in normal code
xglobal.TextDecoder = undefined;

describe('TextDecoder (node)', (): void => {
  let TD: typeof TextDecoder;

  beforeEach(async (): Promise<void> => {
    const node = await import('./node.js');

    TD = node.TextDecoder;
  });

  it('encodes correctly', (): void => {
    expect(
      new TD().decode(new Uint8Array([97, 98, 99]))
    ).toEqual('abc');
  });
});
