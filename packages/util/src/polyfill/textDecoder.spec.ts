// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

describe('TextDecoder', (): void => {
  let origTD: TextDecoder;

  beforeEach((): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    origTD = (global as any).TextDecoder;
  });

  afterEach((): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    (global as any).TextDecoder = origTD;
  });

  it('polyfills with no exceptions (without TextDecoder)', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    (global as any).TextDecoder = null;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(require('./textDecoder')).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    expect((global as any).TextDecoder).toBeDefined();
  });

  it('polyfills with no exceptions (with TextDecoder)', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    (global as any).TextDecoder = require('util').TextDecoder;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(require('./textDecoder')).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    expect((global as any).TextDecoder).toBeDefined();
  });
});
