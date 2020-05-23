// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/* eslint-disable no-proto */

describe('setPrototypeOf', (): void => {
  let orig: (o: Record<string, unknown>, proto: Record<string, unknown> | null) => Record<string, unknown>;

  beforeEach((): void => {
    orig = Object.setPrototypeOf;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Object.setPrototypeOf = null;

    require('./setPrototypeOf');
  });

  afterEach((): void => {
    Object.setPrototypeOf = orig;
  });

  it('polyfills with no exceptions', (): void => {
    const obj = {};
    const proto = { foo: 'bar' };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    expect(Object.setPrototypeOf(obj, proto).__proto__).toBe(proto);
  });
});
