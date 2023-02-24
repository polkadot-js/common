// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line spaced-comment
/// <reference types="@polkadot/dev/node/test/node" />

// no TS, this is not meant to be a global...
export {};

describe('cryptoWaitReady', (): void => {
  it('should return false when it cannot initialize', async (): Promise<void> => {
    const old = global.WebAssembly;

    global.WebAssembly = null as unknown as typeof WebAssembly;

    const { cryptoWaitReady } = await import('./crypto');

    expect(await cryptoWaitReady()).toBe(false);

    global.WebAssembly = old;
  });
});
