// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import './test-polyfill';

describe('ready', () => {
  let globalWA: typeof WebAssembly;

  beforeEach(() => {
    globalWA = (global as any).WebAssembly;
    (global as any).WebAssembly = null;
  });

  afterEach(() => {
    (global as any).WebAssembly = globalWA;
  });

  it('returns false when Webassembly is not available', async () => {
    (global as any).WebAssembly = null;

    const schnorrkelWaitReady = require('./ready').default;
    const isReady = await schnorrkelWaitReady();

    expect(isReady).toBe(false);
  });
});
