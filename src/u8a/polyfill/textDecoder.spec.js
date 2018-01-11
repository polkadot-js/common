// ISC, Copyright 2017-2018 Jaco Greeff

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
