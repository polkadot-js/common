// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

import type { Logger } from './types';

type ConsoleType = 'error' | 'log' | 'warn';

function apply (log: ConsoleType, type: string, values: Array<mixed>): void {
  console[log].apply(console, [new Date().toString(), type].concat(values));
}

/**
  @name Logger
  @signature logger (type: string): Logger
  @summary Creates a consistent log interface for messages
  @description
    Returns a `Logger` that has `.log`, `.error`, `.warn` and `.debug` (constrolled with environment `DEBUG=typeA,typeB`) methods. Logging is done with a consistent prefix (type of logger, date) followed by the actual message using the underlying console.
  @example
    const l = require('@polkadot/util/logger')('test');

    l.log('blah'); // <date>     TEST: blah
*/
module.exports = function logger (_type: string): Logger {
  const type = `               ${_type.toUpperCase()}:`.slice(-16);
  let isDebug;

  try {
    // $FlowFixMe this can fail (undefined/null) - hence the try/catch
    const debugList = process.env.DEBUG.split(',');

    isDebug = !!debugList.find((entry) => _type.indexOf(entry) === 0);
  } catch (error) {
    isDebug = false;
  }

  return {
    debug: isDebug
      ? (...values: Array<mixed>): void => apply('log', type, values)
      : (...values: Array<mixed>): void => void 0,
    error: (...values: Array<mixed>): void => apply('error', type, values),
    log: (...values: Array<mixed>): void => apply('log', type, values),
    warn: (...values: Array<mixed>): void => apply('warn', type, values)
  };
};
