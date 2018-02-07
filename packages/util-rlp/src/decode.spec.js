// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

// const BN = require('bn.js');

// const bnToU8a = require('@polkadot/util/bn/toU8a');
const hexToU8a = require('@polkadot/util/hex/toU8a');
const u8aToHex = require('@polkadot/util/u8a/toHex');

const { decode, encode } = require('./index');

const officalTests = require('../test/rlptest.json');

describe('decode', () => {
  it('returns empty list for undefined inputs', () => {
    expect(
      decode()
    ).toEqual(
      new Uint8Array([])
    );
  });

  it('returns empty list for empty inputs', () => {
    expect(
      decode([])
    ).toEqual(
      new Uint8Array([])
    );
  });

  Object
    .keys(officalTests)
    .map((name) => ({ name, test: officalTests[name] }))
    .forEach(({ name, test }) => {
      it(`passes official ${name}`, () => {
        expect(
          u8aToHex(
            encode(
              decode(
                hexToU8a(`0x${test.out}`)
              )
            )
          )
        ).toEqual(`0x${test.out}`);
      });
    });
});
