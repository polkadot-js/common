// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { _n } from '@noble/hashes/lib/utils';

describe('@noble/hashes', (): void => {
  it('is patched', (): void => {
    expect(
      _n(123) === 123n
    ).toBe(true);
  });
});
