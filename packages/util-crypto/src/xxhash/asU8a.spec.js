// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { hexToU8a } from '@polkadot/util/index';

import { xxhashAsU8a } from './index';

describe('xxhashAsU8a', () => {
  it('returns a 64-bit value by default', () => {
    expect(
      xxhashAsU8a('abc')
    ).toEqual(
      hexToU8a('0x990977adf52cbc44')
    );
  });

  it('returns a 128-bit value (as specified)', () => {
    expect(
      xxhashAsU8a('abc', 128)
    ).toEqual(
      hexToU8a('0x990977adf52cbc440889329981caa9be')
    );
  });

  it('returns a 256-bit value (as specified)', () => {
    expect(
      xxhashAsU8a('abc', 256)
    ).toEqual(
      hexToU8a('0x990977adf52cbc440889329981caa9bef7da5770b2b8a05303b75d95360dd62b')
    );
  });
});
