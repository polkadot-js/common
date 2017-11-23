// ISC, Copyright 2017 Jaco Greeff

/* global jest */

const logger = require('./logger');

describe('logger', () => {
  let l;
  let errorSpy;
  let infoSpy;
  let logSpy;
  let warnSpy;

  beforeEach(() => {
    l = logger('test');

    errorSpy = jest.spyOn(console, 'error');
    infoSpy = jest.SpyOn(console, 'info');
    logSpy = jest.spyOn(console, 'log');
    warnSpy = jest.SpyOn(console, 'warn');
  });

  afterEach(() => {
    errorSpy.mockRestore();
    infoSpy.mockRestore();
    logSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('logs to console.error with .error', () => {
    l.error('console.error test');

    expect(errorSpy).toHaveBeenCalled();
  });

  it('logs to console.error with .fatal', () => {
    l.fatal('console.fatal test');

    expect(errorSpy).toHaveBeenCalled();
  });

  it('logs to console.info with .info', () => {
    l.info('console.info test');

    expect(infoSpy).toHaveBeenCalled();
  });

  it('logs to console.log with .log', () => {
    l.log('console.log test');

    expect(logSpy).toHaveBeenCalled();
  });

  it('logs to console.warn with .warn', () => {
    l.info('console.info test');

    expect(warnSpy).toHaveBeenCalled();
  });
});
