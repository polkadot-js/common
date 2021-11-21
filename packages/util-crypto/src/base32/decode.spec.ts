// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { u8aToString } from '@polkadot/util';

import { base32Decode } from '.';

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
