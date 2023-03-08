// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev/node/test/node" />

import { base64Pad } from './index.js';

describe('base64Pad', (): void => {
  it('pads a utf-8 string', (): void => {
    expect(
      base64Pad('YWJjZA')
    ).toEqual('YWJjZA==');
  });
});
