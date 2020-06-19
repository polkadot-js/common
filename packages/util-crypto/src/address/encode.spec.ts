// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import testingPairs from '@polkadot/keyring/testingPairs';

import encode from './encode';

const keyring = testingPairs({ type: 'ed25519' }, false);

describe('encode', (): void => {
  it('encodes an address to a valid value', (): void => {
    expect(
      keyring.alice.address
    ).toEqual('5GoKvZWG5ZPYL1WUovuHW3zJBWBP5eT8CbqjdRY4Q6iMaQua');
  });

  it('can re-encode an address', (): void => {
    expect(
      encode('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', 68)
    ).toEqual('7sL6eNJj5ZGV5cn3hhV2deRUsivXfBfMH76wCALCqWj1EKzv');
  });

  it('can re-encode an address to Polkadot live', (): void => {
    expect(
      encode('5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', 0)
    ).toEqual('15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5');
  });

  it('fails when non-valid publicKey provided', (): void => {
    expect(
      (): string => encode(
        keyring.alice.publicKey.slice(0, 30)
      )
    ).toThrow(/Expected a valid key/);
  });

  it('encodes a 1-byte address', (): void => {
    expect(
      encode(
        new Uint8Array([1])
      )
    ).toEqual('F7NZ');
  });

  it('encodes a 1-byte address (with prefix)', (): void => {
    expect(
      encode(
        new Uint8Array([1]), 68
      )
    ).toEqual('PqtB');
  });

  it('encodes a 2-byte address', (): void => {
    expect(
      encode(
        new Uint8Array([0, 1]), 68
      )
    ).toEqual('2jpAFn');
  });

  it('encodes a 4-byte address', (): void => {
    expect(
      encode(
        new Uint8Array([1, 2, 3, 4]), 68
      )
    ).toEqual('as7QnGMf');
  });

  it('enodes a 8-byte address', (): void => {
    expect(
      encode(
        new Uint8Array([42, 44, 10, 0, 0, 0, 0, 0]), 68
      )
    ).toEqual('4q7qY5RBG7Z4wv');
  });
});
