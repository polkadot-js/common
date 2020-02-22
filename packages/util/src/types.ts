// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Constructor<T = any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new(...value: any[]): T;
}

export interface ToBn {
  toBn: () => BN;
}

export interface SiDef {
  power: number;
  text: string;
  value: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Logger$Data$Fn = () => any[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Logger$Data = (any | Logger$Data$Fn)[];

export interface Logger {
  debug: (...values: Logger$Data) => void;
  error: (...values: Logger$Data) => void;
  log: (...values: Logger$Data) => void;
  noop: (...values: Logger$Data) => void;
  warn: (...values: Logger$Data) => void;
}

export interface ToBnOptions {
  isLe?: boolean;
  isNegative?: boolean;
}

export type BnList = {
  0: BN;
  1: BN;
} & BN[];
