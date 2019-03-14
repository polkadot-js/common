// Copyright 2017-2019 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { u8aToHex } from '@polkadot/util';

import { encode } from '.';

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
