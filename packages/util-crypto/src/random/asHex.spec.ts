// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { isHex } from '@polkadot/util';

import { randomAsHex } from '.';

describe('randomAsBuffer', (): void => {
  it('generated results does not match', (): void => {
    expect(
      randomAsHex()
    ).not.toEqual(
      randomAsHex()
    );
  });

  it('is a valid hex number', (): void => {
    expect(
      isHex(
        randomAsHex()
      )
    ).toEqual(true);
  });

  it('generates 32 bytes by default', (): void => {
    expect(
      randomAsHex()
    ).toHaveLength(32 * 2 + 2);
  });

  it('generates with the supplied length', (): void => {
    expect(
      randomAsHex(66)
    ).toHaveLength(66 * 2 + 2);
  });
});
