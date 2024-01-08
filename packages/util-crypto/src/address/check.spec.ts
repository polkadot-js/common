// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { checkAddress } from './index.js';

describe('checkAddress', (): void => {
  it('returns [true, null] for Kusama', (): void => {
    expect(
      checkAddress('FJaco77EJ99VtBmVFibuBJR3x5Qq9KQrgQJvWjqScCcCCae', 2)
    ).toEqual([true, null]);
  });

  it('returns [true, null] for Substrate', (): void => {
    expect(
      checkAddress('5EnxxUmEbw8DkENKiYuZ1DwQuMoB2UWEQJZZXrTsxoz7SpgG', 42)
    ).toEqual([true, null]);
  });

  it('fails when an invalid base58 character is supplied', (): void => {
    expect(
      checkAddress('5EnxIUmEbw8DkENKiYuZ1DwQuMoB2UWEQJZZXrTsxoz7SpgG', 2)
    ).toEqual([false, 'Invalid base58 character "I" (0x49) at index 4']);
  });

  it('fails with invalid prefix when checking Substrate against Kusama prefix', (): void => {
    expect(
      checkAddress('5EnxxUmEbw8DkENKiYuZ1DwQuMoB2UWEQJZZXrTsxoz7SpgG', 2)
    ).toEqual([false, 'Prefix mismatch, expected 2, found 42']);
  });

  it('fails with invalid length when some bytes are missing', (): void => {
    expect(
      checkAddress('y9EMHt34JJo4rWLSaxoLGdYXvjgSXEd4zHUnQgfNzwES8b', 42)
    ).toEqual([false, 'Invalid decoded address length']);
  });

  it('fails with invalid length on checksum mismatch', (): void => {
    expect(
      checkAddress('5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaDwU', 42)
    ).toEqual([false, 'Invalid decoded address checksum']);
  });
});
