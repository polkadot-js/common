// Copyright 2017-2021 @polkadot/x-textencoder authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { xglobal } from '@polkadot/x-global';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
xglobal.TextEncoder = undefined;

describe('TextEncoder (node)', (): void => {
  let TE: typeof TextEncoder;

  beforeEach(async (): Promise<void> => {
    const node = await import('./node');

    TE = node.TextEncoder;
  });

  it('encodes correctly', (): void => {
    expect(
      new TE().encode('abc')
    ).toEqual(new Uint8Array([97, 98, 99]));
  });
});
