// Copyright 2017-2020 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { hexToU8a, u8aToHex } from '@polkadot/util';

import { decode, encode } from '.';

import getTests from '../test/getTests';

const rlptests = getTests('RLPTests/rlptest.json');

describe('decode', (): void => {
  it('returns empty list for undefined inputs', (): void => {
    expect(
      decode()
    ).toEqual(
      new Uint8Array([])
    );
  });

  it('returns empty list for empty inputs', (): void => {
    expect(
      decode(new Uint8Array())
    ).toEqual(
      new Uint8Array([])
    );
  });

  rlptests.forEach(({ name, output }): void => {
    it(`passes official ${name}`, (): void => {
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
