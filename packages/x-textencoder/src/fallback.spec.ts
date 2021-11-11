// Copyright 2017-2021 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TextEncoder } from './fallback';

describe('TextEncoder (fallback)', (): void => {
  it('encodes correctly', (): void => {
    expect(
      new TextEncoder().encode('abc')
    ).toEqual(new Uint8Array([97, 98, 99]));
  });
});
