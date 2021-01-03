// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { base32Decode } from '../base32';
import { base58Encode } from './';

describe('base58Encode', (): void => {
  it('encodes a base32 to a base38', (): void => {
    expect(
      base58Encode(
        base32Decode('bafkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy', true),
        true
      )
    ).toEqual('zb2rhk6GMPQF3hfzwXTaNYFLKomMeC6UXdUt6jZKPpeVirLtV');
  });
});
