// Copyright 2017-2018 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import hexToU8a from '@polkadot/util/hex/toU8a';
import stringToU8a from '@polkadot/util/string/toU8a';

import { keccakAsU8a } from './index';

describe('keccakAsU8a', () => {
  const input = 'test value';
  const output = hexToU8a(
    '0x2d07364b5c231c56ce63d49430e085ea3033c750688ba532b24029124c26ca5e'
  );

  it('returns an hex representation (string)', () => {
    expect(
      keccakAsU8a(input)
    ).toEqual(output);
  });

  it('returns an hex representation (Buffer)', () => {
    expect(
      keccakAsU8a(
        Buffer.from(input)
      )
    ).toEqual(output);
  });

  it('returns an hex representation (Uint8Array)', () => {
    expect(
      keccakAsU8a(
        stringToU8a(input)
      )
    ).toEqual(output);
  });
});
