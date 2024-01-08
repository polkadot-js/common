// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import type { Logger } from './types.js';

import { BN } from './bn/index.js';
import { logger, loggerFormat } from './index.js';

describe('logger', (): void => {
  const dateMatch = expect.stringMatching(/20[0-9]{2}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/);
  const prefixMatch = expect.stringMatching(/TEST:/);
  let l: Logger;
  let ln: Logger;
  let spy: Partial<Console>;
  let oldEnv: typeof process.env;

  beforeEach((): void => {
    oldEnv = process.env;
    process.env['NODE_ENV'] = 'development';

    ln = logger('notDebug');

    process.env['DEBUG'] = 'test';

    l = logger('test');

    spy = {
      error: jest.fn(),
      log: jest.fn(),
      warn: jest.fn()
    };
    global.console = spy as Console;
  });

  afterEach((): void => {
    process.env = oldEnv;
    jest.restoreAllMocks();
  });

  describe('loggerFormat', (): void => {
    it('returns null as-is', (): void => {
      expect(loggerFormat(null)).toEqual(null);
    });

    it('returns undefined as-is', (): void => {
      expect(loggerFormat(undefined)).toEqual(undefined);
    });
  });

  it('logs to console.log with .log', (): void => {
    l.log('console.log test');

    expect(spy.log).toHaveBeenCalledWith(
      dateMatch,
      prefixMatch,
      expect.stringMatching('console.log test')
    );
  });

  it('logs with multiple values', (): void => {
    l.log('test', 'a', 2, new BN('12345678900987654321'), Buffer.from([0, 1, 2, 3]));

    expect(spy.log).toHaveBeenCalledWith(
      dateMatch,
      prefixMatch,
      expect.stringMatching('test'),
      expect.stringMatching('a'),
      2,
      expect.stringMatching('12345678900987654321'),
      expect.stringMatching('0x00010203')
    );
  });

  it('logs when called with function', (): void => {
    l.log((): string => 'a function test');

    expect(spy.log).toHaveBeenCalledWith(
      dateMatch,
      prefixMatch,
      expect.stringMatching('a function test')
    );
  });

  it('logs to console.error with .error', (): void => {
    l.error('console.error test');

    expect(spy.error).toHaveBeenCalledWith(
      dateMatch,
      prefixMatch,
      expect.stringMatching('console.error test')
    );
  });

  it('logs to console.warn with .warn', (): void => {
    l.warn('console.warn test');

    expect(spy.warn).toHaveBeenCalledWith(
      dateMatch,
      prefixMatch,
      expect.stringMatching('console.warn test')
    );
  });

  it('does debug log when DEBUG specified', (): void => {
    l.debug('test');

    expect(spy.log).toHaveBeenCalledWith(
      dateMatch,
      prefixMatch,
      expect.stringMatching('test')
    );
  });

  it('does debug log when DEBUG partial specified', (): void => {
    process.env['DEBUG'] = 'test*';

    l = logger('testing');
    l.debug('test');

    expect(spy.log).toHaveBeenCalledWith(
      dateMatch,
      expect.stringMatching(/TESTING:/),
      expect.stringMatching('test')
    );
  });

  it('does not debug log when non-matching DEBUG specified', (): void => {
    process.env['DEBUG'] = 'blah';

    l = logger('test');
    l.debug('test');

    expect(spy.log).not.toHaveBeenCalled();
  });

  it('does debug log when DEBUG=* specified', (): void => {
    process.env['DEBUG'] = '*';

    l = logger('test');
    l.debug('test');

    expect(spy.log).toHaveBeenCalled();
  });

  it('does not debug log when no process.env', (): void => {
    process.env = undefined as unknown as typeof process.env;

    l = logger('test');
    l.debug('test');

    expect(spy.log).not.toHaveBeenCalled();
  });

  it('does not debug log when no DEBUG specified', (): void => {
    ln.debug('test');

    expect(spy.log).not.toHaveBeenCalled();
  });

  it('does not debug log when explicitly excluded', (): void => {
    process.env['DEBUG'] = '*,-test';

    l = logger('test');
    l.debug('test');

    expect(spy.log).not.toHaveBeenCalled();
  });

  it('does not debug log when part of exclusion group', (): void => {
    process.env['DEBUG'] = '*,-test:*';

    l = logger('test:sub');
    l.debug('test');

    expect(spy.log).not.toHaveBeenCalled();
  });

  it('does debug log when not part of exclusion groups', (): void => {
    process.env['DEBUG'] = '*,-test:*,-tes,-a:*';

    l = logger('test');
    l.debug('test');

    expect(spy.log).toHaveBeenCalled();
  });
});
