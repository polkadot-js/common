// ISC, Copyright 2017 Jaco Greeff
// @flow

type Logger = {
  error: (params: any) => void,
  log: (params: any) => void,
  warn: (params: any) => void
};

type LogType = 'error' | 'log' | 'warn';

function apply (log: LogType, type: string, values: Array<any>): void {
  console[log].apply(console, [new Date().toString(), type].concat(values));
}

/**
  @name Logger
  @signature logger (type: string): Logger
  @summary Creates a consistent log interface for messages
  @description
    Returns a `Logger` that has `.log`, `.error` and `.warn` methods. Loggins is done with a consistent prefix (type of logger, date) followed by the actual message uning the underlying console.
  @example
    const l = require('@polkadot/util/logger')('test');

    l.log('blah'); // <date>     TEST: blah
*/
module.exports = function logger (_type: string): Logger {
  const type = `               ${_type.toUpperCase()}:`.slice(-16);

  return {
    error: (...values: any): void => apply('error', type, values),
    log: (...values: any): void => apply('log', type, values),
    warn: (...values: any): void => apply('warn', type, values)
  };
};
