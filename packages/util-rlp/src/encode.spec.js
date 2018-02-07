// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const BN = require('bn.js');

const bnToU8a = require('@polkadot/util/bn/toU8a');
const u8aToHex = require('@polkadot/util/u8a/toHex');

const { encode } = require('./index');

const officalTests = require('../test/rlptest.json');

describe('encode', () => {
  Object
    .keys(officalTests)
    .map((name) => ({ name, test: officalTests[name] }))
    .forEach(({ name, test }) => {
      it(`passes official ${name}`, () => {
        expect(
          u8aToHex(
            encode(
              test.in[0] !== '#'
                ? test.in
                : bnToU8a(new BN(test.in.slice(1)))
            )
          )
        ).toEqual(`0x${test.out}`);
      });
    });
});
