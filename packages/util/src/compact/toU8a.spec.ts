// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';

import compactToU8a from './toU8a';

describe('encode', () => {
  it('encodes short u8', () => {
    expect(
      compactToU8a(18, 8)
    ).toEqual(
      new Uint8Array([18 << 2])
    );
  });

  it('encodes max u8 values', () => {
    expect(
      compactToU8a(new BN(63), 16)
    ).toEqual(
      new Uint8Array([0b11111100])
    );
  });

  it('encodes basic u16 value', () => {
    expect(
      compactToU8a(511, 32)
    ).toEqual(
      new Uint8Array([0b11111101, 0b00000111])
    );
  });

  it('encodes basic u16 (not at edge)', () => {
    expect(
      compactToU8a(111, 32)
    ).toEqual(
      new Uint8Array([0xbd, 0x01])
    );
  });

  it('encodes basic u32 values (short)', () => {
    expect(
      compactToU8a(0xffff, 32)
    ).toEqual(
      new Uint8Array([254, 255, 3, 0])
    );
  });

  it('encodes basic u32 values (full)', () => {
    expect(
      compactToU8a(0xfffffff9)
    ).toEqual(
      new Uint8Array([3 + ((4 - 4) << 2), 249, 255, 255, 255])
    );
  });
});
