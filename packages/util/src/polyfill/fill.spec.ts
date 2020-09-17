// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* eslint-disable no-extend-native */
/* eslint-disable @typescript-eslint/unbound-method */

describe('Array.fill', (): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let arrayFill: (value: any, start?: number | undefined, end?: number | undefined) => any[];
  let u8aFill: (value: number, start?: number | undefined, end?: number | undefined) => Uint8Array;

  beforeEach((): void => {
    arrayFill = Array.prototype.fill;
    u8aFill = Uint8Array.prototype.fill;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Array.prototype.fill = null;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Uint8Array.prototype.fill = null;

    require('./fill');
  });

  afterEach((): void => {
    Array.prototype.fill = arrayFill;
    Uint8Array.prototype.fill = u8aFill;
  });

  it('uses the polyfills', (): void => {
    expect(
      [1, 2, 3, 4, 5, 6, 7, 8].fill(5, 3)
    ).toEqual([1, 2, 3, 5, 5, 5, 5, 5]);
    expect(
      new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]).fill(5, 3)
    ).toEqual(new Uint8Array([1, 2, 3, 5, 5, 5, 5, 5]));
  });
});
