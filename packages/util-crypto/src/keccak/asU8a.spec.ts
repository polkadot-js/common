// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexToU8a, stringToU8a } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';

import { keccakAsU8a } from '.';

describe('keccakAsU8a', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  const input = 'test value';
  const output = hexToU8a(
    '0x2d07364b5c231c56ce63d49430e085ea3033c750688ba532b24029124c26ca5e'
  );

  it('returns an hex representation (string)', (): void => {
    expect(
      keccakAsU8a(input)
    ).toEqual(output);
  });

  it('returns an hex representation (Buffer)', (): void => {
    expect(
      keccakAsU8a(
        Buffer.from(input)
      )
    ).toEqual(output);
  });

  it('returns an hex representation (Uint8Array)', (): void => {
    expect(
      keccakAsU8a(
        stringToU8a(input)
      )
    ).toEqual(output);
  });
});
