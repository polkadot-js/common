// Copyright 2017-2018 @polkadot/primitives authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import roleToId from './toId';

describe('roleToId', () => {
  it('throws when valid mapping is not found', () => {
    expect(
      () => roleToId()
    ).toThrow(/mapping from role/);
  });

  it('returns the role mapping an string', () => {
    expect(
      roleToId('collator')
    ).toEqual(0b00000100);
  });
});
