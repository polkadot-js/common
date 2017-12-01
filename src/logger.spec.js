// ISC, Copyright 2017 Jaco Greeff

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
