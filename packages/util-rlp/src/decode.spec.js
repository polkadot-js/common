// Copyright 2017-2018 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import hexToU8a from '@polkadot/util/hex/toU8a';
import u8aToHex from '@polkadot/util/u8a/toHex';

import { decode, encode } from './index';

import getTests from '../test/getTests';

const rlptests = getTests('RLPTests/rlptest.json');

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
