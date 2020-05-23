// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

/* eslint-disable no-extend-native */
/* eslint-disable @typescript-eslint/unbound-method */

if (!Array.prototype.fill) {
  // eslint-disable-next-line no-extend-native,@typescript-eslint/no-explicit-any
  Array.prototype.fill = function fill (value: any, start = 0, end?: number): any[] {
    // Steps 1-2.
    if (!this) {
      throw new TypeError('this is null or not defined');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const A = Object(this);

    // Steps 3-5.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const len = A.length >>> 0;

    // Steps 6-7.
    const relativeStart = start >> 0;

    // Step 8.
    let k = relativeStart < 0
      ? Math.max(len + relativeStart, 0)
      : Math.min(relativeStart, len);

    // Steps 9-10.
    const relativeEnd = end === undefined
      ? len
      : end >> 0;

    // Step 11.
    const final = relativeEnd < 0
      ? Math.max(len + relativeEnd, 0)
      : Math.min(relativeEnd, len);

    // Step 12.
    while (k < final) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      A[k] = value;
      k++;
    }

    // Step 13.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return A;
  };
}

if (!Uint8Array.prototype.fill) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Uint8Array.prototype.fill = Array.prototype.fill;
}
