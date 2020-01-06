// Copyright 2017-2020 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import BN from 'bn.js';

import toU8a from './toU8a';

describe('toU8a', (): void => {
  it('returns a Uint8Array input as-is', (): void => {
    expect(
      toU8a(new Uint8Array([1, 2, 3]))
    ).toEqual(
      new Uint8Array([1, 2, 3])
    );
  });

  it('converts Buffers (uses as Uint8Array)', (): void => {
    expect(
      toU8a(Buffer.from([0x12, 0x34, 0x56]))
    ).toEqual(
      new Uint8Array([0x12, 0x34, 0x56])
    );
  });

  it('returns undefined as empty', (): void => {
    expect(
      toU8a()
    ).toEqual(
      new Uint8Array([])
    );
  });

  it('returns null as empty', (): void => {
    expect(
      toU8a(null)
    ).toEqual(
      new Uint8Array([])
    );
  });

  it('converts hex strings', (): void => {
    expect(
      toU8a('0x123456')
    ).toEqual(
      new Uint8Array([0x12, 0x34, 0x56])
    );
  });

  it('converts UTF-8 strings', (): void => {
    expect(
      toU8a('Привет, мир!')
    ).toEqual(
      new Uint8Array([208, 159, 209, 128, 208, 184, 208, 178, 208, 181, 209, 130, 44, 32, 208, 188, 208, 184, 209, 128, 33])
    );
  });

  it('converts numbers', (): void => {
    expect(
      toU8a(0x123456)
    ).toEqual(
      new Uint8Array([0x12, 0x34, 0x56])
    );
  });

  it('converts BN', (): void => {
    expect(
      toU8a(new BN(0x123456))
    ).toEqual(
      new Uint8Array([0x12, 0x34, 0x56])
    );
  });

  it('throws on unknown type', (): void => {
    expect(
      (): Uint8Array => toU8a(true)
    ).toThrow(/invalid type/);
  });
});
