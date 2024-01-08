// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from './bn/bn.js';

/* eslint-disable @typescript-eslint/no-explicit-any */

/** An interface that defines an actual JS class */
export interface Class<T = any, A extends unknown[] = any[]> {
  prototype: T;

  new (...args: A): T;

  hasOwnProperty (prop: string): boolean;
  isPrototypeOf (other: unknown): boolean;
}

// @deprecated Use Class<T, A> instead
export type Constructor<T = any, A extends unknown[] = any[]> = Class<T, A>;

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

export interface Logger {
  debug: (...values: unknown[]) => void;
  error: (...values: unknown[]) => void;
  log: (...values: unknown[]) => void;
  noop: (...values: unknown[]) => void;
  warn: (...values: unknown[]) => void;
}

export interface ToBnOptions {
  /** Convert in LE format */
  isLe?: boolean;
  /** Number is signed, apply two's complement */
  isNegative?: boolean;
}

export interface NumberOptions extends ToBnOptions {
  /** Limit to the specified bitLength, despite input length */
  bitLength?: number;
}

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

// BufferObject interface compatible with Buffer since we don't want to require
// references to the Buffer types from the node typings
//
// Caveat: the references still do sneak in in the d.ts files, specifically
// inside u8a/toBuffer & is/buffer (but not in compiled outputs)
export interface BufferObject extends Uint8Array {
  // Possibly used externally via type imports
  equals: (otherBuffer: Uint8Array) => boolean;
  // As used in is/buffer
  readDoubleLE: (offset?: number) => number;
}

// We define a scappy low-level interface to mock Buffer
// (this removes the need for the node typings in built bundles)
export interface BufferClass extends Class<BufferObject> {
  // As used in u8a/toBuffer
  from: <T = BufferObject>(value: unknown) => T;
  // As used in is/buffer
  isBuffer: (value: unknown) => boolean;
}

export type U8aLike = number[] | Uint8Array | AnyString;

export interface Observable {
  next: (...params: unknown[]) => unknown;
}
