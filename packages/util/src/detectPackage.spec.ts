// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { detectPackage } from '.';

describe('assertSingletonPackage', (): void => {
  it('should not log the first time', (): void => {
    const spy = jest.spyOn(console, 'warn');

    detectPackage({ name: '@polkadot/util', version: 'a.b.c-1st' });
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should log the second time', (): void => {
    const spy = jest.spyOn(console, 'warn');

    detectPackage({ name: '@polkadot/util', version: 'a.b.c-2nd' });
    expect(spy).toHaveBeenCalledWith('Multiple versions of @polkadot/util detected: a.b.c-1st, a.b.c-2nd. Ensure that there is only one version in your dependency tree');
    spy.mockRestore();
  });
});
