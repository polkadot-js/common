// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

describe('TextDecoder', () => {
  let origTD;

  beforeEach(() => {
    origTD = global.TextDecoder;
  });

  afterEach(() => {
    global.TextDecoder = origTD;
  });

  it('polyfills with no exceptions (without TextDecoder)', () => {
    global.TextDecoder = null;

    expect(require('./textDecoder')).toBeDefined();
    expect(global.TextDecoder).toBeDefined();
  });

  it('polyfills with no exceptions (with TextDecoder)', () => {
    global.TextDecoder = require('util').TextDecoder;

    expect(require('./textDecoder')).toBeDefined();
    expect(global.TextDecoder).toBeDefined();
  });
});
