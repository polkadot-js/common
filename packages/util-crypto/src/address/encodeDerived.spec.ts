// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import encodeDerivedAddress from './encodeDerived';

describe('encodeDerivedAddress', (): void => {
  it('creates a valid known derived address', (): void => {
    expect(
      encodeDerivedAddress('5GvUh7fGKsdBEh5XpypkfkGuf7j3vXLxH9BdxjxnJNVXRYi1', 0)
    ).toEqual('5E5XxqPxm7QbEs6twYfp3tyjXidn4kqRrNPH4o6JK9JSLUeD');
  });
});
