// Copyright 2017-2023 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line spaced-comment
/// <reference types="@polkadot/dev/node/test/node" />

import { base64Pad } from '.';

describe('base64Pad', (): void => {
  it('pads a utf-8 string', (): void => {
    expect(
      base64Pad('YWJjZA')
    ).toEqual('YWJjZA==');
  });
});
