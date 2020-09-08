// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';

import compactToU8a from './toU8a';

describe('encode', (): void => {
  it('encodes short u8', (): void => {
    expect(
      compactToU8a(18)
    ).toEqual(
      new Uint8Array([18 << 2])
    );
  });

  it('encodes max u8 values', (): void => {
    expect(
      compactToU8a(new BN(63))
    ).toEqual(
      new Uint8Array([0b11111100])
    );
  });

  it('encodes basic u16 value', (): void => {
    expect(
      compactToU8a(511)
    ).toEqual(
      new Uint8Array([0b11111101, 0b00000111])
    );
  });

  it('encodes basic u16 (not at edge)', (): void => {
    expect(
      compactToU8a(111)
    ).toEqual(
      new Uint8Array([0xbd, 0x01])
    );
  });

  it('encodes basic u32 values (< 2^30)', (): void => {
    expect(
      compactToU8a(0x1fff)
    ).toEqual(
      new Uint8Array([253, 127])
    );
  });

  it('encodes basic u32 values (short)', (): void => {
    expect(
      compactToU8a(0xffff)
    ).toEqual(
      new Uint8Array([254, 255, 3, 0])
    );
  });

  it('encodes basic u32 values (full)', (): void => {
    expect(
      compactToU8a(0xfffffff9)
    ).toEqual(
      new Uint8Array([3 + ((4 - 4) << 2), 249, 255, 255, 255])
    );
  });

  it('encodes a large value', (): void => {
    expect(
      compactToU8a(
        new BN('00005af3107a4000', 16)
      )
    ).toEqual(
      new Uint8Array([3 + ((6 - 4) << 2), 0x00, 0x40, 0x7a, 0x10, 0xf3, 0x5a])
    );
  });

  describe('from Rust', (): void => {
    // Copied from https://github.com/paritytech/parity-codec/blob/master/src/codec.rs
    const testCases = [
      { expected: '00', value: new BN('0') },
      { expected: 'fc', value: new BN('63') },
      { expected: '01 01', value: new BN('64') },
      { expected: 'fd ff', value: new BN('16383') },
      { expected: '02 00 01 00', value: new BN('16384') },
      { expected: 'fe ff ff ff', value: new BN('1073741823') },
      { expected: '03 00 00 00 40', value: new BN('1073741824') },
      { expected: '03 ff ff ff ff', value: new BN(`${1}${'0'.repeat(32)}`, 2).subn(1) },
      { expected: '07 00 00 00 00 01', value: new BN(`${1}${'0'.repeat(32)}`, 2) },
      { expected: '0b 00 00 00 00 00 01', value: new BN(`${1}${'0'.repeat(40)}`, 2) },
      { expected: '0f 00 00 00 00 00 00 01', value: new BN(`${1}${'0'.repeat(48)}`, 2) },
      { expected: '0f ff ff ff ff ff ff ff', value: new BN(`${1}${'0'.repeat(56)}`, 2).subn(1) },
      { expected: '13 00 00 00 00 00 00 00 01', value: new BN(`${1}${'0'.repeat(56)}`, 2) },
      { expected: '13 ff ff ff ff ff ff ff ff', value: new BN(`${1}${'0'.repeat(64)}`, 2).subn(1) }
    ];

    function testEncode (value: BN, expected: string): void {
      it(`encodes ${value.toString()}`, (): void => {
        expect(
          compactToU8a(value)
        ).toEqual(
          Uint8Array.from(
            expected.split(' ').map((s): number => parseInt(s, 16))
          )
        );
      });
    }

    testCases.forEach(({ expected, value }): void => testEncode(value, expected));
  });
});
