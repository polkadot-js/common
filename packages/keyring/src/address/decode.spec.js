// Copyright 2017-2018 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
// @flow

import testingPairs from '../testingPairs';
import decode from './decode';

const keyring = testingPairs();

describe('decode', () => {
  it('decodes an address', () => {
    expect(
      decode('5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaDtZ')
    ).toEqual(
      keyring.alice.publicKey()
    );
  });

  it('converts a publicKey (u8a) as-is', () => {
    expect(
      decode(new Uint8Array([1, 2, 3]))
    ).toEqual(
      new Uint8Array([1, 2, 3])
    );
  });

  it('converts a publicKey (hex) as-is', () => {
    expect(
      decode('0x01020304')
    ).toEqual(
      new Uint8Array([1, 2, 3, 4])
    );
  });

  it('decodes a short address', () => {
    expect(
      decode('F7L6')
    ).toEqual(new Uint8Array([1]));
  });

  it('decodes a 1-byte accountId (with prefix)', () => {
    expect(
      decode('Pqt7', 68)
    ).toEqual(new Uint8Array([1]));
  });

  it('decodes a 2-byte accountId', () => {
    expect(
      decode('2jpAJz', 68)
    ).toEqual(new Uint8Array([0, 1]));
  });

  it('encodes a 4-byte address', () => {
    expect(
      decode('as7QnGQ7', 68)
    ).toEqual(new Uint8Array([1, 2, 3, 4]));
  });

  it('decodes a 8-byte accountId', () => {
    expect(
      decode('4q7qY5RBG7Z4xX', 68)
    ).toEqual(new Uint8Array([42, 44, 10, 0, 0, 0, 0, 0]));
  });

  it('allows invalid prefix (in list)', () => {
    expect(
      () => decode('6GfvWUvHvU8otbZ7sFhXH4eYeMcKdUkL61P3nFy52efEPVUx')
    ).toThrow(/address prefix/);
  });

  it('fails when length is invalid', () => {
    expect(
      () => decode('y9EMHt34JJo4rWLSaxoLGdYXvjgSXEd4zHUnQgfNzwES8b')
    ).toThrow(/address length/);
  });

  it('fails when the checksum does not match', () => {
    expect(
      () => decode('5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMa9cj')
    ).toThrow(/address checksum/);
    expect(
      () => decode('5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaDwU')
    ).toThrow(/address checksum/);
  });
});
