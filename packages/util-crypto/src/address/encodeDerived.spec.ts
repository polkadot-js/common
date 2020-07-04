// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import encodeDerivedAddress from './encodeDerived';

describe('encodeDerivedAddress', (): void => {
  it('creates a valid known derived address', (): void => {
    expect(
      encodeDerivedAddress('5GvUh7fGKsdBEh5XpypkfkGuf7j3vXLxH9BdxjxnJNVXRYi1', 0)
    ).toEqual('5E5XxqPxm7QbEs6twYfp3tyjXidn4kqRrNPH4o6JK9JSLUeD');
  });
});
