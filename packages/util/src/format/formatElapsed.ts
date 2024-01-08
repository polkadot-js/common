// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '../bn/bn.js';
import type { ToBn } from '../types.js';

import { bnToBn } from '../bn/toBn.js';

/** @internal */
function formatValue (elapsed: number): string {
  if (elapsed < 15) {
    return `${elapsed.toFixed(1)}s`;
  } else if (elapsed < 60) {
    return `${elapsed | 0}s`;
  } else if (elapsed < 3600) {
    return `${elapsed / 60 | 0}m`;
  }

  return `${elapsed / 3600 | 0}h`;
}

/**
 * @name formatElapsed
 * @description Formats an elapsed value into s, m, h or day segments
 */
export function formatElapsed <ExtToBn extends ToBn> (now?: Date | null, value?: bigint | BN | ExtToBn | Date | number | null): string {
  const tsNow = now?.getTime() || 0;
  const tsValue = value instanceof Date
    ? value.getTime()
    : bnToBn(value).toNumber();

  return (tsNow && tsValue)
    ? formatValue(Math.max(Math.abs(tsNow - tsValue), 0) / 1000)
    : '0.0s';
}
