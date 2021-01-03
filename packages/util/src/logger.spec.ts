// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Logger } from './types';

import BN from 'bn.js';

import { format } from './logger';
import { logger } from '.';

describe('logger', (): void => {
  let dateMatch: unknown;
  let prefixMatch: unknown;
  let l: Logger;
  let ln: Logger;
  let spy: Partial<Console>;
  let oldEnv: NodeJS.ProcessEnv;

  beforeEach((): void => {
    oldEnv = process.env;
    process.env.NODE_ENV = 'development';

    ln = logger('notDebug');

    process.env.DEBUG = 'test';

    l = logger('test');

    spy = {
      error: jest.fn(),
      log: jest.fn(),
      warn: jest.fn()
    };
    global.console = spy as Console;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    dateMatch = expect.stringMatching(/20[0-9]{2}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}/);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    prefixMatch = expect.stringMatching(/TEST:/);
  });

  afterEach((): void => {
    process.env = oldEnv;
    jest.restoreAllMocks();
  });

  describe('format', (): void => {
    it('returns null as-is', (): void => {
      expect(format(null)).toEqual(null);
    });

    it('returns undefined as-is', (): void => {
      expect(format(undefined)).toEqual(undefined);
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
    l = logger('testing');
    l.debug('test');

    expect(spy.log).toHaveBeenCalledWith(
      dateMatch,
      expect.stringMatching(/TESTING:/),
      expect.stringMatching('test')
    );
  });

  it('does not debug log when non-matching DEBUG specified', (): void => {
    process.env.DEBUG = 'blah';

    l = logger('test');
    l.debug('test');

    expect(spy.log).not.toHaveBeenCalled();
  });

  it('does debug log when DEBUG=* specified', (): void => {
    process.env.DEBUG = '*';

    l = logger('test');
    l.debug('test');

    expect(spy.log).toHaveBeenCalled();
  });

  it('does not debug log when no process.env', (): void => {
    process.env = undefined as unknown as NodeJS.ProcessEnv;

    l = logger('test');
    l.debug('test');

    expect(spy.log).not.toHaveBeenCalled();
  });

  it('does not debug log when no DEBUG specified', (): void => {
    ln.debug('test');

    expect(spy.log).not.toHaveBeenCalled();
  });
});
