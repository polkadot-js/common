// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

export interface ExtErrorInterface {
  code: number;
  data: mixed;
  message: string;
  stack: string;
}

export type Logger = {
  debug: (...values: Array<mixed>) => void,
  error: (...values: Array<mixed>) => void,
  log: (...values: Array<mixed>) => void,
  warn: (...values: Array<mixed>) => void
};
