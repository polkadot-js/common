// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

describe('TextDecoder', (): void => {
  let origTD: TextDecoder;

  beforeEach((): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    origTD = (global as any).TextDecoder;
  });

  afterEach((): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).TextDecoder = origTD;
  });

  it('polyfills with no exceptions (without TextDecoder)', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).TextDecoder = null;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(require('./textDecoder')).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((global as any).TextDecoder).toBeDefined();
  });

  it('polyfills with no exceptions (with TextDecoder)', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).TextDecoder = require('util').TextDecoder;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(require('./textDecoder')).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((global as any).TextDecoder).toBeDefined();
  });
});
