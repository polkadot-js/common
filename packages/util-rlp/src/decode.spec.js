// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const hexToU8a = require('@polkadot/util/hex/toU8a');
const u8aToHex = require('@polkadot/util/u8a/toHex');

const rlptests = require('../test/rlptests');
const { decode, encode } = require('./index');

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

  rlptests.forEach(({ name, output }) => {
    it(`passes official ${name}`, () => {
      expect(
        u8aToHex(
          encode(
            decode(
              hexToU8a(output)
            )
          )
        )
      ).toEqual(output);
    });
  });
});
