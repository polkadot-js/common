// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { U16_TO_HEX } from './alphabet';
import { hexToU8a } from '.';

describe('hexToU8a', (): void => {
  it('returns an empty Uint8Array when null provided', (): void => {
    expect(
      hexToU8a(null)
    ).toHaveLength(0);
  });

  it('returns a Uint8Array with the correct values', (): void => {
    expect(
      hexToU8a('0x80000a')
    ).toEqual(
      new Uint8Array([128, 0, 10])
    );
  });

  it('returns a Uint8Array with the correct values (bitLength > provided)', (): void => {
    expect(
      hexToU8a('0x80000A', 64)
    ).toEqual(
      new Uint8Array([0, 0, 0, 0, 0, 128, 0, 10])
    );
  });

  it('returns a Uint8Array with the correct values (bitLength < provided)', (): void => {
    expect(
      hexToU8a('0x80000a', 16)
    ).toEqual(
      new Uint8Array([128, 0])
    );
  });

  it('fails when non-hex value provided', (): void => {
    expect(
      () => hexToU8a('notahex')
    ).toThrow(/hex value to convert/);
  });

  it.skip('performance', (): void => {
    let a = '0x';

    for (let i = 0; i < 640000; i++) {
      a += U16_TO_HEX[i % (256 * 256)];
    }

    console.time('hexToU8a:performance');

    for (let i = 0; i < 64; i++) {
      hexToU8a(a);
    }

    console.timeEnd('hexToU8a:performance');
  });
});
