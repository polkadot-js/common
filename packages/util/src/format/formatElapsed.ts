// Copyright 2017-2020 @polkadot/ui-util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ToBn } from '../types';

import BN from 'bn.js';

import isToBn from '../is/toBn';

function getValue <ExtToBn extends ToBn> (value?: BN | ExtToBn | Date | number | null): number {
  if (value) {
    if (isToBn(value)) {
      return getValue(value.toBn());
    } else if (value instanceof Date) {
      return getValue(value.getTime());
    } else if (value instanceof BN) {
      return getValue(value.toNumber());
    }
  }

  return (value as number) || 0;
}

export default function formatElapsed <ExtToBn extends ToBn> (now?: Date | null, value?: BN | ExtToBn | Date | number | null): string {
  const tsNow = (now && now.getTime()) || 0;
  const tsValue = getValue(value);
  let display = '0.0s';

  if (tsNow && tsValue) {
    const elapsed = Math.max(Math.abs(tsNow - tsValue), 0) / 1000;

    if (elapsed < 15) {
      display = `${elapsed.toFixed(1)}s`;
    } else if (elapsed < 60) {
      display = `${elapsed | 0}s`;
    } else if (elapsed < 3600) {
      display = `${elapsed / 60 | 0}m`;
    } else {
      display = `${elapsed / 3600 | 0}h`;
    }
  }

  return display;
}
