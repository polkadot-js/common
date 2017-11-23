// ISC, Copyright 2017 Jaco Greeff
// @flow

type Logger = {
  error: (params: any) => void,
  log: (params: any) => void,
  warn: (params: any) => void
};

function format (type: string, values: Array<any>): Array<any> {
  return [new Date().toString(), type].concat(values);
}

function error (type: string, values: Array<any>): void {
  console.error.apply(console, format(type, values));
}

function log (type: string, values: Array<any>): void {
  console.log.apply(console, format(type, values));
}

function warn (type: string, values: Array<any>): void {
  console.warn.apply(console, format(type, values));
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
  const type = `          ${_type.toUpperCase()}:`.slice(-11);

  return {
    format: (...values: any): Array<any> => format(type, values),
    error: (...values: any): void => error(type, values),
    log: (...values: any): void => log(type, values),
    warn: (...values: any): void => warn(type, values)
  };
};
