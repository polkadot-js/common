// Copyright 2017-2018 @polkadot/util-rlp authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const u8aToHex = require('@polkadot/util/u8a/toHex');

const { encode } = require('./index');

const rlptests = require('../test/getTests')('RLPTests/rlptest.json');

describe('encode', () => {
  rlptests.forEach(({ name, input, output }) => {
    it(`passes official ${name}`, () => {
      expect(
        u8aToHex(
          encode(input)
        )
      ).toEqual(output);
    });
  });
});
