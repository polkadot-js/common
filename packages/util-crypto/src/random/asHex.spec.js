// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { isHex } from '@polkadot/util/index';

import { randomAsHex } from './index';

describe('randomAsBuffer', () => {
  it('generated results does not match', () => {
    expect(
      randomAsHex()
    ).not.toEqual(
      randomAsHex()
    );
  });

  it('is a valid hex number', () => {
    expect(
      isHex(
        randomAsHex()
      )
    ).toEqual(true);
  });

  it('generates 32 bytes by default', () => {
    expect(
      randomAsHex()
    ).toHaveLength(32 * 2 + 2);
  });

  it('generates with the suuplied length', () => {
    expect(
      randomAsHex(66)
    ).toHaveLength(66 * 2 + 2);
  });
});
