// Copyright 2017-2019 @polkadot/util authors & contributors
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

    // eslint-disable-next-line no-proto
    expect(Object.setPrototypeOf(obj, proto).__proto__).toBe(proto);
  });
});
