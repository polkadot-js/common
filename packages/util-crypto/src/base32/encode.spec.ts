// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { base58Decode } from '../base58';
import { base32Encode } from './';

describe('base32Encode', (): void => {
  it('encodes to a base32', (): void => {
    expect(
      base32Encode('Decentralize everything!!')
    ).toEqual('irswgzloorzgc3djpjssazlwmvzhs5dinfxgoijb');
  });

  it('encodes a base58 to a base32', (): void => {
    expect(
      base32Encode(
        base58Decode('zb2rhk6GMPQF3hfzwXTaNYFLKomMeC6UXdUt6jZKPpeVirLtV', true),
        true
      )
    ).toEqual('bafkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy');
  });
});
