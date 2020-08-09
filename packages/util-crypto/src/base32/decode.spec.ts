// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aToString } from '@polkadot/util';

import { base32Decode } from './';

describe('base32Decode', (): void => {
  it('decodes a base32', (): void => {
    expect(
      u8aToString(
        base32Decode('irswgzloorzgc3djpjssazlwmvzhs5dinfxgoijb')
      )
    ).toEqual('Decentralize everything!!');
  });

  it('decodes a base32 (ipfsCompat)', (): void => {
    expect(
      u8aToString(
        base32Decode('birswgzloorzgc3djpjssazlwmvzhs5dinfxgoijb', true)
      )
    ).toEqual('Decentralize everything!!');
  });
});
