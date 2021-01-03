// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { waitReady } from '@polkadot/wasm-crypto';

import { xxhashAsHex } from '.';

describe('xxhashAsHex', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  it('returns a 64-bit value by default', (): void => {
    expect(
      xxhashAsHex('abc')
    ).toEqual('0x990977adf52cbc44');
  });

  it('returns a 128-bit value (as specified)', (): void => {
    expect(
      xxhashAsHex('abc', 128)
    ).toEqual('0x990977adf52cbc440889329981caa9be');
  });

  it('returns a 256-bit value (as specified)', (): void => {
    expect(
      xxhashAsHex('abc', 256)
    ).toEqual('0x990977adf52cbc440889329981caa9bef7da5770b2b8a05303b75d95360dd62b');
  });
});
