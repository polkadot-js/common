// ISC, Copyright 2017 Jaco Greeff
// @flow

type Logger = {
  error: (params: any) => void,
  fatal: (params: any) => void,
  info: (params: any) => void,
  log: (params: any) => void,
  warn: (params: any) => void
};

function createParams (type: string, values: Array<any>): Array<any> {
  return [new Date().toString(), type].concat(values);
}

function error (type: string, values: Array<any>): void {
  console.error.apply(console, createParams(type, values));
}

function fatal (type: string, values: Array<any>): void {
  error(type, values);
}

function info (type: string, values: Array<any>): void {
  error(type, values);
}

function log (type: string, values: Array<any>): void {
  console.log.apply(console, createParams(type, values));
}

function warn (type: string, values: Array<any>): void {
  console.warn.apply(console, createParams(type, values));
}

module.exports = function logger (_type: string): Logger {
  const type = `          ${_type.toUpperCase()}:`.slice(-11);

  return {
    error: (...values: any): void => error(type, values),
    fatal: (...values: any): void => fatal(type, values),
    info: (...values: any): void => info(type, values),
    log: (...values: any): void => log(type, values),
    warn: (...values: any): void => warn(type, values)
  };
};
