// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable no-extend-native */

import assert from '../assert';

function getOffset (value: number, length: number): number {
  return value < 0
    ? Math.max(length + value, 0)
    : Math.min(value, length);
}

if (!Array.prototype.fill) {
  // eslint-disable-next-line no-extend-native
  Array.prototype.fill = function fill <T> (value: T, start = 0, end?: number): T[] {
    assert(this, 'this is null or not defined');

    const A = Object(this) as T[];
    const relativeEnd = end ?? A.length;
    const final = getOffset(relativeEnd, A.length);
    let k = getOffset(start, A.length);

    while (k < final) {
      A[k] = value;
      k++;
    }

    return A;
  };
}

if (!Uint8Array.prototype.fill) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Uint8Array.prototype.fill = Array.prototype.fill;
}
