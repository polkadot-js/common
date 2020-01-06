// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

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

  it('returns a Uint8Array with the correct values (bitLengfth)', (): void => {
    expect(
      hexToU8a('0x80000a', 32)
    ).toEqual(
      new Uint8Array([0, 128, 0, 10])
    );
  });

  it('fails when non-hex value provided', (): void => {
    expect(
      (): Uint8Array => hexToU8a('notahex')
    ).toThrow(/hex value to convert/);
  });
});
