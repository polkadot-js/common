// Copyright 2017-2024 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isAddress } from './index.js';

describe('isAddress', (): void => {
  it('decodes an address', (): void => {
    expect(
      isAddress('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY')
    ).toEqual(true);
  });

  it('decodes the council address', (): void => {
    expect(
      isAddress('F3opxRbN5ZbjJNU511Kj2TLuzFcDq9BGduA9TgiECafpg29')
    ).toEqual(true);
  });

  it('converts a publicKey (hex) as-is', (): void => {
    expect(
      isAddress('0x01020304')
    ).toEqual(true);
  });

  it('decodes a short address', (): void => {
    expect(
      isAddress('F7NZ')
    ).toEqual(true);
  });

  it('decodes a 1-byte accountId (with prefix)', (): void => {
    expect(
      isAddress('g4b', false, 2)
    ).toEqual(true);
  });

  it('decodes a 2-byte accountId', (): void => {
    expect(
      isAddress('3xygo', false, 2)
    ).toEqual(true);
  });

  it('encodes a 4-byte address', (): void => {
    expect(
      isAddress('zswfoZa', false, 2)
    ).toEqual(true);
  });

  it('decodes a 8-byte address', (): void => {
    expect(
      isAddress('848Gh2GcGaZia', false, 2)
    ).toEqual(true);
  });

  it('decodes a 33-byte address', (): void => {
    expect(
      isAddress('KWCv1L3QX9LDPwY4VzvLmarEmXjVJidUzZcinvVnmxAJJCBou')
    ).toEqual(true);
  });

  it('decodes a 2-byte prefix (65)', (): void => {
    expect(
      isAddress('cLtA6nCDyvwKcEHH4QkZDSHMhS9s78BvUJUsKUbUAn1Jc2SCF')
    ).toEqual(true);
  });

  it('decodes a 2-byte prefix (69)', (): void => {
    expect(
      isAddress('cnUaoo5wodnTVA4bnr4woSweto8hWZADUvLFXkR9Q6U7BRsbF')
    ).toEqual(true);
  });

  it('decodes a 2-byte prefix (252)', (): void => {
    expect(
      isAddress('xw9Hca4RJTmBRgzJT4ieJBh7XCK9gE3NXBDSEmgGHd4TCrbnG')
    ).toEqual(true);
  });

  it('decodes a 2-byte prefix (255)', (): void => {
    expect(
      isAddress('yGHU8YKprxHbHdEv7oUK4rzMZXtsdhcXVG2CAMyC9WhzhjH2k')
    ).toEqual(true);
  });

  it('decodes a 2-byte prefix (ecdsa, from Substrate)', (): void => {
    expect(
      isAddress('4pbsSkWcBaYoFHrKJZp5fDVUKbqSYD9dhZZGvpp3vQ5ysVs5ybV')
    ).toEqual(true);
  });

  it('fails when length is invalid', (): void => {
    expect(
      isAddress('y9EMHt34JJo4rWLSaxoLGdYXvjgSXEd4zHUnQgfNzwES8b')
    ).toEqual(false);
  });

  it('fails when the checksum does not match', (): void => {
    expect(
      isAddress('5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMa9cj')
    ).toEqual(false);
    expect(
      isAddress('5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaDwU')
    ).toEqual(false);
  });

  it('fails when invalid base58 encoded address is found', (): void => {
    expect(
      isAddress('F3opIRbN5ZbjJNU511Kj2TLuzFcDq9BGduA9TgiECafpg29')
    ).toEqual(false);
  });
});
