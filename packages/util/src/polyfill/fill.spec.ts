// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

describe('Array.fill', () => {
  let arrayFill: any;
  let u8aFill: any;

  beforeEach(() => {
    arrayFill = Array.prototype.fill;
    u8aFill = Uint8Array.prototype.fill;

    // @ts-ignore
    Array.prototype.fill = null;
    // @ts-ignore
    Uint8Array.prototype.fill = null;

    require('./fill');
  });

  afterEach(() => {
    Array.prototype.fill = arrayFill;
    Uint8Array.prototype.fill = u8aFill;
  });

  it('uses the polyfills', () => {
    expect(
      [1, 2, 3, 4, 5, 6, 7, 8].fill(5, 3)
    ).toEqual([1, 2, 3, 5, 5, 5, 5, 5]);
    expect(
      new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]).fill(5, 3)
    ).toEqual(new Uint8Array([1, 2, 3, 5, 5, 5, 5, 5]));
  });
});
