// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from './bn/bn';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Constructor<T = any> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new(...value: any[]): T;
}

export interface ToBigInt {
  toBigInt: () => bigint;
}

export interface ToBn {
  toBn: () => BN;
}

export interface SiDef {
  power: number;
  text: string;
  value: string;
}

type Logger$Data$Fn = () => unknown[];
export type Logger$Data = (unknown | Logger$Data$Fn)[];

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

export interface Time {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export type Memoized<F> = F & {
  unmemoize: (...args: unknown[]) => void;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type AnyString = string | String;

export type HexDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f';

// One day when template strings support regex, we can improve this
export type HexString = `0x${string}`;

export type U8aLike = HexString | number[] | Buffer | Uint8Array | AnyString;

export interface IBigIntConstructor {
  new (value: string | number | bigint | boolean): bigint;

  /**
  * Interprets the low bits of a BigInt as a 2's-complement signed integer.
  * All higher bits are discarded.
  * @param bits The number of low bits to use
  * @param int The BigInt whose bits to extract
  */
  asIntN (bits: number, int: bigint): bigint;

  /**
  * Interprets the low bits of a BigInt as an unsigned integer.
  * All higher bits are discarded.
  * @param bits The number of low bits to use
  * @param int The BigInt whose bits to extract
  */
  asUintN (bits: number, int: bigint): bigint;
}
