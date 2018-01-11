// ISC, Copyright 2017-2018 Jaco Greeff

describe('TextEncoder', () => {
  let origTE;

  beforeEach(() => {
    origTE = global.TextEncoder;
  });

  afterEach(() => {
    global.TextEncoder = origTE;
  });

  it('polyfills with no exceptions (without TextEncoder)', () => {
    global.TextEncoder = null;

    expect(require('./textEncoder')).toBeDefined();
    expect(global.TextEncoder).toBeDefined();
  });

  it('polyfills with no exceptions (with TextEncoder)', () => {
    global.TextEncoder = require('util').TextEncoder;

    expect(require('./textEncoder')).toBeDefined();
    expect(global.TextEncoder).toBeDefined();
  });
});
