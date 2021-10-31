// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isBigInt } from './is/bigInt';

/** @internal */
function replacer (_: unknown, v: unknown): unknown {
  return isBigInt(v)
    ? v.toString()
    : v;
}

export function stringify (args: unknown, space?: string | number): string {
  return JSON.stringify(args, replacer, space);
}
