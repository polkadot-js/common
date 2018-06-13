// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

export interface ExtErrorInterface {
  code: number;
  data: mixed;
  message: string;
  stack: string;
}

export type Logger$Data = Array<mixed | () => Array<mixed>>;

export type Logger = {
  debug: (...values: Logger$Data) => void,
  error: (...values: Logger$Data) => void,
  log: (...values: Logger$Data) => void,
  warn: (...values: Logger$Data) => void
};
