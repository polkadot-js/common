// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const { logger } = require('./index');

describe('logger', () => {
  let dateMatch;
  let prefixMatch;
  let l;
  let ln;
  let spy;

  beforeEach(() => {
    ln = logger('notDebug');

    process.env.DEBUG = 'test';

    l = logger('test');

    spy = {
      error: jest.fn(),
      log: jest.fn(),
      warn: jest.fn()
    };
    global.console = spy;

    dateMatch = expect.stringMatching(/20[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/);
    prefixMatch = expect.stringMatching(/TEST:/);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('logs to console.error with .error', () => {
    l.error('console.error test');

    expect(spy.error).toHaveBeenCalledWith(
      dateMatch,
      prefixMatch,
      'console.error test'
    );
  });

  it('logs to console.warn with .warn', () => {
    l.warn('console.warn test');

    expect(spy.warn).toHaveBeenCalledWith(
      dateMatch,
      prefixMatch,
      'console.warn test'
    );
  });

  it('logs to console.log with .log', () => {
    l.log('console.log test');

    expect(spy.log).toHaveBeenCalledWith(
      dateMatch,
      prefixMatch,
      'console.log test'
    );
  });

  it('logs to with mulptiple values', () => {
    l.log('test', 'a', 2);

    expect(spy.log).toHaveBeenCalledWith(
      dateMatch,
      prefixMatch,
      'test',
      'a',
      2
    );
  });

  it('does debug log when DEBUG specified', () => {
    l.debug('test');

    expect(spy.log).toHaveBeenCalledWith(
      dateMatch,
      prefixMatch,
      'test'
    );
  });

  it('does debug log when DEBUG partial specified', () => {
    l = logger('testing');
    l.debug('test');

    expect(spy.log).toHaveBeenCalledWith(
      dateMatch,
      expect.stringMatching(/TESTING:/),
      'test'
    );
  });

  it('does not debug log when non-matching DEBUG specified', () => {
    process.env.DEBUG = 'blah';

    l = logger('test');
    l.debug('test');

    expect(spy.log).not.toHaveBeenCalled();
  });

  it('does not debug log when no DEBUG specified', () => {
    ln.debug('test');

    expect(spy.log).not.toHaveBeenCalled();
  });
});
