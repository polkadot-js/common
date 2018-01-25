// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
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
