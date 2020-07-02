// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { numberToU8a } from '.';

describe('numberToU8a', (): void => {
  it('converts undefined to empty', (): void => {
    expect(
      numberToU8a()
    ).toEqual(new Uint8Array());
  });

  it('converts null to empty', (): void => {
    expect(
      numberToU8a(null)
    ).toEqual(new Uint8Array());
  });

  it('converts NaN to empty', (): void => {
    expect(
      numberToU8a(NaN)
    ).toEqual(new Uint8Array());
  });

  it('converts 0 to u8a', (): void => {
    expect(
      numberToU8a(0)
    ).toEqual(new Uint8Array([0]));
  });

  it('converts 0 to u8a (with length)', (): void => {
    expect(
      numberToU8a(0, 16)
    ).toEqual(new Uint8Array([0, 0]));
  });

  it('converts values to the u8a', (): void => {
    expect(
      numberToU8a(0x3456)
    ).toEqual(new Uint8Array([0x34, 0x56]));
  });

  it('converts values to the u8a (bitLength)', (): void => {
    expect(
      numberToU8a(0x3456, 32)
    ).toEqual(new Uint8Array([0x00, 0x00, 0x34, 0x56]));
  });
});
