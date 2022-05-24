// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BN } from '../bn/bn';
import { hexToU8a } from '../hex/toU8a';
import { performance } from '../test/performance';
import { compactFromU8a } from '.';

describe('compactFromU8a', (): void => {
  it('decoded u8 value', (): void => {
    expect(
      compactFromU8a(new Uint8Array([0b11111100]))
    ).toEqual([1, new BN(63)]);
  });

  it('decodes from same u16 encoded value', (): void => {
    expect(
      compactFromU8a(new Uint8Array([0b11111101, 0b00000111])).toString()
    ).toEqual(
      [2, new BN(511)].toString()
    );
  });

  it('decodes from same u32 encoded value (short)', (): void => {
    expect(
      compactFromU8a(new Uint8Array([254, 255, 3, 0])).toString()
    ).toEqual(
      [4, new BN(0xffff)].toString()
    );
  });

  it('decodes from same u32 encoded value (short)', (): void => {
    expect(
      compactFromU8a(new Uint8Array([254, 255, 255, 255])).toString()
    ).toEqual(
      [4, new BN(1073741823)].toString()
    );
  });

  it('decodes from same u32 encoded value (full)', (): void => {
    expect(
      compactFromU8a(new Uint8Array([3, 249, 255, 255, 255]))
    ).toEqual([5, new BN(0xfffffff9)]);
  });

  it('decodes from same u32 as u64 encoded value (full, default)', (): void => {
    expect(
      compactFromU8a(new Uint8Array([3 + ((4 - 4) << 2), 249, 255, 255, 255]))
    ).toEqual([5, new BN(0xfffffff9)]);
  });

  it('decodes an actual value', (): void => {
    expect(
      compactFromU8a(
        hexToU8a('0x0b00407a10f35a')
      )
    ).toEqual([7, new BN('5af3107a4000', 16)]);
  });

  it('decodes an actual value', (): void => {
    expect(
      compactFromU8a(
        hexToU8a('0x0284d717')
      )[1].toString()
    ).toEqual('100000000');
  });

  performance('compactFromU8a (u8)', 1_000_000, [[new Uint8Array([63 << 2])]], compactFromU8a);
  performance('compactFromU8a (u16)', 1_000_000, [[new Uint8Array([0b11111101, 0b00000111])]], compactFromU8a);
  performance('compactFromU8a (u32)', 1_000_000, [[new Uint8Array([254, 255, 3, 0])]], compactFromU8a);
  performance('compactFromU8a (u64)', 250_000, [[hexToU8a('0x0b00407a10f35a')]], compactFromU8a);
});
