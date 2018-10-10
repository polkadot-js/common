// Copyright 2017-2018 @polkadot/util-keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import testingPairs from '../testingPairs';
import encode from './encode';

const keyring = testingPairs();

describe('encode', () => {
  it('encodes an address to a valid value', () => {
    expect(
      keyring.alice.address()
    ).toEqual('5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaDtZ');
  });

  it('fails when non-valid publicKey provided', () => {
    expect(
      () => encode(
        keyring.alice.publicKey().slice(0, 30)
      )
    ).toThrow(/Expected a valid key/);
  });

  it('encodes a 1-byte address', () => {
    expect(
      encode(
        new Uint8Array([1])
      )
    ).toEqual('F7L6');
  });

  it('encodes a 1-byte address (with prefix)', () => {
    expect(
      encode(
        new Uint8Array([1]), 68
      )
    ).toEqual('Pqt7');
  });
});
