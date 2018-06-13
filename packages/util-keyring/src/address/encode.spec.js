// Copyright 2017-2018 @polkadot/util-keyring authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const keyring = require('../testingPairs')();
const encode = require('./encode');

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
    ).toThrow(/Expected a valid publicKey/);
  });
});
