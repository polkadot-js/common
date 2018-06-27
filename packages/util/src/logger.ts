// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Logger, Logger$Data } from './types';

import chalk from 'chalk';

import isFunction from './is/function';

type ConsoleType = 'error' | 'log' | 'warn';
type LogType = ConsoleType | 'debug';

const logTo = {
  debug: 'log',
  error: 'error',
  log: 'log',
  warn: 'warn'
};

const chalked = {
  debug: chalk.gray,
  error: chalk.red,
  log: chalk.reset,
  warn: chalk.yellow
};

function apply (log: LogType, type: string, values: Logger$Data): void {
  if (values.length === 1 && isFunction(values[0])) {
    const fnResult = (values[0] as Function)();

    return apply(log, type, fnResult);
  }

  const chalk = (value: string): string =>
    chalked[log](value);

  // @ts-ignore Not sure how to coax TS here...
  console[logTo[log]].apply(
    console, [
      chalk(new Date().toString()), chalk(type)
    ].concat(values)
  );
}

/**
 * @name Logger
 * @signature logger (type: string): Logger
 * @summary Creates a consistent log interface for messages
 * @description
 * Returns a `Logger` that has `.log`, `.error`, `.warn` and `.debug` (constrolled with environment `DEBUG=typeA,typeB`) methods. Logging is done with a consistent prefix (type of logger, date) followed by the actual message using the underlying console.
 * @example
 *   const l from '@polkadot/util/logger')('test');
 *
 *   l.log('blah'); // <date>     TEST: blah
 */
export default function logger (_type: string): Logger {
  const type = `               ${_type.toUpperCase()}:`.slice(-16);
  let isDebug;

  try {
    const isTest = process.env.NODE_ENV === 'test';
    const debugList = (process.env.DEBUG || '').split(',');

    isDebug = isTest || !!debugList.find((entry) => _type.indexOf(entry) === 0);
  } catch (error) {
    isDebug = false;
  }

  return {
    debug: isDebug
      ? (...values: Logger$Data): void => apply('debug', type, values)
      : (...values: Logger$Data): void => void 0,
    error: (...values: Logger$Data): void => apply('error', type, values),
    log: (...values: Logger$Data): void => apply('log', type, values),
    warn: (...values: Logger$Data): void => apply('warn', type, values)
  };
}
