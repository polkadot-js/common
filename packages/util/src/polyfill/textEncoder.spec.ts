// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

describe('TextEncoder', (): void => {
  let origTE: TextEncoder;

  beforeEach((): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    origTE = (global as any).TextEncoder;
  });

  afterEach((): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    (global as any).TextEncoder = origTE;
  });

  it('polyfills with no exceptions (without TextEncoder)', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    (global as any).TextEncoder = null;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(require('./textEncoder')).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    expect((global as any).TextEncoder).toBeDefined();
  });

  it('polyfills with no exceptions (with TextEncoder)', (): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    (global as any).TextEncoder = require('util').TextEncoder;

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(require('./textEncoder')).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    expect((global as any).TextEncoder).toBeDefined();
  });
});
