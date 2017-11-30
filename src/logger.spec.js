// ISC, Copyright 2017 Jaco Greeff

/* global jest */

const { logger } = require('./index');

describe('logger', () => {
  let l;
  let spy;

  beforeEach(() => {
    l = logger('test');

    spy = {
      error: jest.fn(),
      log: jest.fn(),
      warn: jest.fn()
    };
    global.console = spy;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('format', () => {
    let formatted;

    beforeEach(() => {
      formatted = l.format('paramA', 'paramB');
    });

    it('adds the date, type & params', () => {
      expect(formatted.length).toBe(4);
    });
  });

  it('logs to console.error with .error', () => {
    l.error('console.error test');

    expect(spy.error).toHaveBeenCalled();
  });

  it('logs to console.log with .log', () => {
    l.log('console.log test');

    expect(spy.log).toHaveBeenCalled();
  });

  it('logs to console.warn with .warn', () => {
    l.warn('console.warn test');

    expect(spy.warn).toHaveBeenCalled();
  });
});
