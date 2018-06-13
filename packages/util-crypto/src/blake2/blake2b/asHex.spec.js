// Copyright 2017-2018 @polkadot/util-crypto authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const hexToU8a = require('@polkadot/util/hex/toU8a');

const { blake2bAsHex } = require('./index');

describe('blake2bAsHex', () => {
  it('creates the correct hash', () => {
    expect(
      blake2bAsHex('abc')
    ).toEqual('0xba80a53f981c4d0d6a2797b69f12f6e94c212f14685ac4b74b12bb6fdbffa2d17d87c5392aab792dc252d5de4533cc9518d38aa8dbf1925ab92386edd4009923');
  });

  it('matches the Rust implementation', () => {
    expect(
      blake2bAsHex(
        hexToU8a('0x454545454545454545454545454545454545454545454545454545454545454501000000000000002481853da20b9f4322f34650fea5f240dcbfb266d02db94bfa0153c31f4a29dbdbf025dd4a69a6f4ee6e1577b251b655097e298b692cb34c18d3182cac3de0dc00000000'), 256
      )
    ).toEqual('0x1025e5db74fdaf4d2818822dccf0e1604ae9ccc62f26cecfde23448ff0248abf');
  });
});
