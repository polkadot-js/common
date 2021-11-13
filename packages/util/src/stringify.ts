// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isBigInt } from './is/bigInt';

/** @internal */
function replacer (_: unknown, v: unknown): unknown {
  return isBigInt(v)
    ? v.toString()
    : v;
}

/**
 * @name stringify
 * @summary Performs a JSON.stringify, with BigInt handling
 * @description A wrapper for JSON.stringify that handles BigInt values transparently, converting them to string. No differences from the native JSON.stringify function otherwise.
 */
export function stringify (value: unknown, space?: string | number): string {
  return JSON.stringify(value, replacer, space);
}
