// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BN, bnToHex } from '.';

describe('bnToHex', (): void => {
  it('converts null values to 0x00', (): void => {
    expect(
      bnToHex(null)
    ).toBe('0x00');
  });

  it('converts BN values to a prefixed hex representation', (): void => {
    expect(
      bnToHex(new BN(128))
    ).toBe('0x80');
  });

  it('converts BN values to a prefixed hex representation (bitLength)', (): void => {
    expect(
      bnToHex(new BN(128), 16)
    ).toBe('0x0080');
  });

  it('converts BN values to a prefixed hex representation (bitLength + le)', (): void => {
    expect(
      bnToHex(new BN(128), 16, true)
    ).toBe('0x8000');
  });

  it('converts BN values to a prefixed hex representation (LE)', (): void => {
    expect(
      bnToHex(new BN(128), { bitLength: 16, isLe: true })
    ).toBe('0x8000');
  });

  it('handles negative numbers', (): void => {
    expect(
      bnToHex(new BN(-1234), { isNegative: true })
    ).toBe('0xfb2e');
  });

  it('handles negative numbers (with bitLength)', (): void => {
    expect(
      bnToHex(new BN(-1234), { bitLength: 32, isNegative: true })
    ).toBe('0xfffffb2e');
  });

  it('handles backwards compatibility', (): void => {
    expect(
      bnToHex(new BN(1234), 32)
    ).toBe(
      bnToHex(new BN(1234), { bitLength: 32 })
    );
  });
});
