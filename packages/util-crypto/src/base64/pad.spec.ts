// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { base64Pad } from './index.js';

describe('base64Pad', (): void => {
  it('pads a utf-8 string', (): void => {
    expect(
      base64Pad('YWJjZA')
    ).toEqual('YWJjZA==');
  });
});
