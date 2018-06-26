// Copyright 2017-2018 @polkadot/primitives authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import roleFromId from './fromId';

describe('roleFromId', () => {
  it('throws when valid mapping is not found', () => {
    expect(
      () => roleFromId()
    ).toThrow(/Unable to find valid role/);
  });

  it('returns the role mapping an string', () => {
    expect(
      roleFromId(0b00000100)
    ).toEqual('collator');
  });
});
