// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { BN } from '../bn/bn.js';
import { hexToU8a } from '../hex/toU8a.js';
import { perf } from '../test/index.js';
import { compactFromU8a, compactFromU8aLim } from './index.js';

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

  it('decodes from same u32 encoded value (short, max)', (): void => {
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

  it('decodes an actual value (Buffer)', (): void => {
    expect(
      compactFromU8a(
        Buffer.from('0b00407a10f35a', 'hex')
      )
    ).toEqual([7, new BN('5af3107a4000', 16)]);
  });

  it('decodes an actual value (100000000)', (): void => {
    expect(
      compactFromU8a(
        hexToU8a('0x0284d717')
      )[1].toString()
    ).toEqual('100000000');
  });

  perf('compactFromU8a (u8)', 1_000_000, [[new Uint8Array([63 << 2])]], compactFromU8a);
  perf('compactFromU8a (u16)', 1_000_000, [[new Uint8Array([0b11111101, 0b00000111])]], compactFromU8a);
  perf('compactFromU8a (u32)', 1_000_000, [[new Uint8Array([254, 255, 3, 0])]], compactFromU8a);
  perf('compactFromU8aLim (u32)', 1_000_000, [[new Uint8Array([254, 255, 3, 0])]], compactFromU8aLim);
  perf('compactFromU8a (u48)', 1_000_000, [[hexToU8a('0x0b00407a10f35a')]], compactFromU8a);
  perf('compactFromU8a (u96)', 250_000, [[new Uint8Array([23, 52, 0x40, 0x7a, 0x10, 0xf3, 0x5a, 0, 0, 18])]], compactFromU8a);
});
