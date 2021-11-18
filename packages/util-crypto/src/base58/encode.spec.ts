// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { base32Decode } from '../base32';
import { base58Encode } from './';

const test = base32Decode('bafkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy', true);

describe('base58Encode', (): void => {
  it('encodes a base58', (): void => {
    expect(
      base58Encode(test)
    ).toEqual('b2rhk6GMPQF3hfzwXTaNYFLKomMeC6UXdUt6jZKPpeVirLtV');
  });

  it('encodes a base58 (ipfs format)', (): void => {
    expect(
      base58Encode(test, true)
    ).toEqual('zb2rhk6GMPQF3hfzwXTaNYFLKomMeC6UXdUt6jZKPpeVirLtV');
  });
});
