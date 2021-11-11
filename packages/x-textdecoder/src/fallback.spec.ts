// Copyright 2017-2021 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { TextDecoder } from './fallback';

describe('TextDecoder (fallback)', (): void => {
  it('decodes correctly', (): void => {
    expect(
      new TextDecoder().decode(new Uint8Array([97, 98, 99]))
    ).toEqual('abc');
  });
});
