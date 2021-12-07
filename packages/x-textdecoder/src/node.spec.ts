// Copyright 2017-2021 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { xglobal } from '@polkadot/x-global';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
xglobal.TextDecoder = undefined;

describe('TextDecoder (node)', (): void => {
  let TD: typeof TextDecoder;

  beforeEach(async (): Promise<void> => {
    const node = await import('./node');

    TD = node.TextDecoder;
  });

  it('encodes correctly', (): void => {
    expect(
      new TD().decode(new Uint8Array([97, 98, 99]))
    ).toEqual('abc');
  });
});
