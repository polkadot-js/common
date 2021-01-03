// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { base32Validate } from '.';

describe('base32Validate', (): void => {
  it('validates ipfs-compat encoded', (): void => {
    expect(
      () => base32Validate('bafkreigh2akiscaildcqabsyg3dfr6chu3fgpregiymsck7e7aqa4s52zy', true)
    ).not.toThrow();
  });
});
