// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

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
