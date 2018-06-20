// Copyright 2017-2018 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import u8aToHex from '@polkadot/util/u8a/toHex';

import { encode } from './index';

import getTests from '../test/getTests';

const rlptests = getTests('RLPTests/rlptest.json');

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
