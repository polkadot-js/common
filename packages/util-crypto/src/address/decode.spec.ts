// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { stringToU8a, u8aToHex } from '@polkadot/util';

import testingPairs, { TestKeyringMap } from '../../../keyring/src/testingPairs';
import decode from './decode';

describe('decode', (): void => {
  let keyring: TestKeyringMap;

  beforeAll((): void => {
    keyring = testingPairs({ type: 'sr25519' });
  });

  it('decodes an address', (): void => {
    expect(
      decode('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY')
    ).toEqual(
      keyring.alice.publicKey
    );
  });

  it('decodes the council address', (): void => {
    expect(
      u8aToHex(decode('F3opxRbN5ZbjJNU511Kj2TLuzFcDq9BGduA9TgiECafpg29'))
    ).toEqual(u8aToHex(stringToU8a('modlpy/trsry'.padEnd(32, '\0'))));
  });

  it('converts a publicKey (u8a) as-is', (): void => {
    expect(
      decode(new Uint8Array([1, 2, 3]))
    ).toEqual(
      new Uint8Array([1, 2, 3])
    );
  });

  it('converts a publicKey (hex) as-is', (): void => {
    expect(
      decode('0x01020304')
    ).toEqual(
      new Uint8Array([1, 2, 3, 4])
    );
  });

  it('decodes a short address', (): void => {
    expect(
      decode('F7NZ')
    ).toEqual(new Uint8Array([1]));
  });

  it('decodes a 1-byte accountId (with prefix)', (): void => {
    expect(
      decode('PqtB', false, 68)
    ).toEqual(new Uint8Array([1]));
  });

  it('decodes a 2-byte accountId', (): void => {
    expect(
      decode('2jpAFn', false, 68)
    ).toEqual(new Uint8Array([0, 1]));
  });

  it('encodes a 4-byte address', (): void => {
    expect(
      decode('as7QnGMf', false, 68)
    ).toEqual(new Uint8Array([1, 2, 3, 4]));
  });

  it('decodes a 8-byte address', (): void => {
    expect(
      decode('4q7qY5RBG7Z4wv', false, 68)
    ).toEqual(new Uint8Array([42, 44, 10, 0, 0, 0, 0, 0]));
  });

  it.skip('allows invalid prefix (in list)', (): void => {
    expect(
      (): Uint8Array => decode('6GfvWUvHvU8otbZ7sFhXH4eYeMcKdUkL61P3nFy52efEPVUx')
    ).toThrow(/address prefix/);
  });

  it('fails when length is invalid', (): void => {
    expect(
      (): Uint8Array => decode('y9EMHt34JJo4rWLSaxoLGdYXvjgSXEd4zHUnQgfNzwES8b')
    ).toThrow(/address length/);
  });

  it('fails when the checksum does not match', (): void => {
    expect(
      (): Uint8Array => decode('5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMa9cj')
    ).toThrow(/address checksum/);
    expect(
      (): Uint8Array => decode('5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaDwU')
    ).toThrow(/address checksum/);
  });

  it('fails when invalid base58 encoded address is found', (): void => {
    expect(
      () => u8aToHex(decode('F3opIRbN5ZbjJNU511Kj2TLuzFcDq9BGduA9TgiECafpg29'))
    ).toThrow(/Decoding F3opIRbN5ZbjJNU511Kj2TLuzFcDq9BGduA9TgiECafpg29: Invalid base58 character "I" \(0x49\) at index 4/);
  });
});
