/* eslint-disable no-proto */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable @typescript-eslint/unbound-method */
// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

describe('setPrototypeOf', (): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let orig: (o: any, proto: object | null) => any;

  beforeEach((): void => {
    orig = Object.setPrototypeOf;

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

    expect(Object.setPrototypeOf(obj, proto).__proto__).toBe(proto);
  });
});
