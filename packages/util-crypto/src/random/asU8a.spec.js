// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import isU8a from '@polkadot/util/is/u8a';

import { randomAsU8a } from './index';

describe('randomAsU8a', () => {
  it('generates a Uint8Array', () => {
    expect(
      isU8a(randomAsU8a())
    ).toEqual(true);
  });

  it('generated results does not match', () => {
    expect(
      randomAsU8a()
    ).not.toEqual(
      randomAsU8a()
    );
  });

  it('generates 32 bytes by default', () => {
    expect(
      randomAsU8a()
    ).toHaveLength(32);
  });

  it('generates with the suuplied length', () => {
    expect(
      randomAsU8a(66)
    ).toHaveLength(66);
  });
});
