// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

describe('setPrototypeOf', () => {
  let orig: (o: any, proto: object | null) => any;

  beforeEach(() => {
    orig = Object.setPrototypeOf;

    // @ts-ignore
    Object.setPrototypeOf = null;

    require('./setPrototypeOf');
  });

  afterEach(() => {
    Object.setPrototypeOf = orig;
  });

  it('polyfills with no exceptions', () => {
    const obj = {};
    const proto = { foo: 'bar' };

    expect(Object.setPrototypeOf(obj, proto).__proto__).toBe(proto);
  });
});
