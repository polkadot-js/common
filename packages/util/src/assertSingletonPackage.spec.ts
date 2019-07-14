// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assertSingletonPackage } from '.';

describe('assertSingletonPackage', (): void => {
  const NAME = 'assertSingletonPackage';

  it('should not throw the first time', (): void => {
    expect(
      (): void => assertSingletonPackage(NAME)
    ).not.toThrow();
  });

  it('should throw the second time', (): void => {
    expect(
      (): void => assertSingletonPackage(NAME)
    ).toThrow(/Multiple versions of assertSingletonPackage detected/);
  });
});
