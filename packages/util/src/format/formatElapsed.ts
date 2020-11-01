// Copyright 2017-2020 @polkadot/ui-util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ToBn } from '../types';

import BN from 'bn.js';

import isToBn from '../is/toBn';

function getValue <ExtToBn extends ToBn> (value?: BN | ExtToBn | Date | number | null): number {
  if (isToBn(value)) {
    return getValue(value.toBn());
  } else if (value instanceof Date) {
    return getValue(value.getTime());
  } else if (value instanceof BN) {
    return getValue(value.toNumber());
  }

  return value || 0;
}

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

export default function formatElapsed <ExtToBn extends ToBn> (now?: Date | null, value?: BN | ExtToBn | Date | number | null): string {
  const tsNow = (now && now.getTime()) || 0;
  const tsValue = getValue(value);

  if (tsNow && tsValue) {
    const elapsed = Math.max(Math.abs(tsNow - tsValue), 0) / 1000;

    return formatValue(elapsed);
  }

  return '0.0s';
}
