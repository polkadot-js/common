// Copyright 2017-2020 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { u8aToHex } from '@polkadot/util';

import { encode } from '.';

import getTests from '../test/getTests';

const rlptests = getTests('RLPTests/rlptest.json');

describe('encode', (): void => {
  rlptests.forEach(({ name, input, output }): void => {
    it(`passes official ${name}`, (): void => {
      expect(
        u8aToHex(
          encode(input)
        )
      ).toEqual(output);
    });
  });
});
