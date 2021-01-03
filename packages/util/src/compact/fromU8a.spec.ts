// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import BN from 'bn.js';

import { hexToU8a } from '../hex/toU8a';
import { compactFromU8a } from '.';

describe('compactFromU8a', (): void => {
  it('decoded u8 value', (): void => {
    expect(
      compactFromU8a(new Uint8Array([0b11111100]))
    ).toEqual([1, new BN(63)]);
  });

  it('decodes from same u16 encoded value', (): void => {
    expect(
      compactFromU8a(new Uint8Array([0b11111101, 0b00000111]), 32)
    ).toEqual([2, new BN(511)]);
  });

  it('decodes from same u32 encoded value (short)', (): void => {
    expect(
      compactFromU8a(new Uint8Array([254, 255, 3, 0]), 32)
    ).toEqual([4, new BN(0xffff)]);
  });

  it('decodes from same u32 encoded value (full)', (): void => {
    expect(
      compactFromU8a(new Uint8Array([3, 249, 255, 255, 255]), 32)
    ).toEqual([5, new BN(0xfffffff9)]);
  });

  it('decodes from same u32 as u64 encoded value (full, default)', (): void => {
    expect(
      compactFromU8a(new Uint8Array([3 + ((4 - 4) << 2), 249, 255, 255, 255]), 64)
    ).toEqual([5, new BN(0xfffffff9)]);
  });

  it('decodes an actual value', (): void => {
    expect(
      compactFromU8a(
        hexToU8a('0x0b00407a10f35a')
      )
    ).toEqual([7, new BN('5af3107a4000', 16)]);
  });
});
