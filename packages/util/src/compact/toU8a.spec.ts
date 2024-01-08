// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { BN } from '../bn/index.js';
import { compactToU8a } from './index.js';

const TESTS: [output: string | Uint8Array, input: BN | number][] = [
  // Rust tests
  // Copied from https://github.com/paritytech/parity-codec/blob/master/src/codec.rs
  ['00', new BN('0')],
  ['fc', new BN('63')],
  ['01 01', new BN('64')],
  ['fd ff', new BN('16383')],
  ['02 00 01 00', new BN('16384')],
  ['fe ff ff ff', new BN('1073741823')],
  ['03 00 00 00 40', new BN('1073741824')],
  ['03 ff ff ff ff', new BN(`${1}${'0'.repeat(32)}`, 2).subn(1)],
  ['07 00 00 00 00 01', new BN(`${1}${'0'.repeat(32)}`, 2)],
  ['0b 00 00 00 00 00 01', new BN(`${1}${'0'.repeat(40)}`, 2)],
  ['0f 00 00 00 00 00 00 01', new BN(`${1}${'0'.repeat(48)}`, 2)],
  ['0f ff ff ff ff ff ff ff', new BN(`${1}${'0'.repeat(56)}`, 2).subn(1)],
  ['13 00 00 00 00 00 00 00 01', new BN(`${1}${'0'.repeat(56)}`, 2)],
  ['13 ff ff ff ff ff ff ff ff', new BN(`${1}${'0'.repeat(64)}`, 2).subn(1)],
  // own tests
  [new Uint8Array([18 << 2]), 18],
  [new Uint8Array([0b11111100]), 63],
  [new Uint8Array([0xbd, 0x01]), 111],
  [new Uint8Array([0b11111101, 0b00000111]), 511],
  [new Uint8Array([253, 127]), 0x1fff],
  [new Uint8Array([254, 255, 3, 0]), 0xffff],
  [new Uint8Array([3 + ((4 - 4) << 2), 249, 255, 255, 255]), 0xfffffff9],
  [new Uint8Array([3 + ((6 - 4) << 2), 0x00, 0x40, 0x7a, 0x10, 0xf3, 0x5a]), new BN('00005af3107a4000', 16)],
  [new Uint8Array([23, 52, 0x40, 0x7a, 0x10, 0xf3, 0x5a, 0, 0, 18]), new BN('1200005af3107a4034', 16)]
];

describe('encode', (): void => {
  it('does not modify the original', (): void => {
    const original = new BN(123456);

    expect(compactToU8a(original)).toEqual(new Uint8Array([2, 137, 7, 0]));
    expect(original.toString()).toEqual('123456');
  });

  describe('conversion tests', (): void => {
    TESTS.forEach(([output, input], i): void => {
      it(`#${i}: encodes ${input.toString()}`, (): void => {
        expect(
          compactToU8a(input)
        ).toEqual(
          output instanceof Uint8Array
            ? output
            : Uint8Array.from(output.split(' ').map((s) => parseInt(s, 16)))
        );
      });
    });
  });
});
