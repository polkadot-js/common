// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { detectPackage } from '.';

describe('assertSingletonPackage', (): void => {
  const PKG = '@polkadot/util';
  const VER1 = '9.8.0-beta.45';
  const VER2 = '9.7.1';
  const PATH = '/Users/jaco/Projects/polkadot-js/api/node_modules/@polkadot/util';

  it('should not log the first time', (): void => {
    const spy = jest.spyOn(console, 'warn');

    detectPackage({ name: PKG, version: VER1 }, `${PATH}/01`);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should log the second time', (): void => {
    const spy = jest.spyOn(console, 'warn');

    detectPackage({ name: PKG, version: VER2 }, `${PATH}/02`);
    expect(spy).toHaveBeenCalledWith(`Multiple instances of @polkadot/util detected, ensure that there is only one package in your dependency tree.\n\t${VER1}\t${PATH}/01\n\t${VER2}        \t${PATH}/02`);
    spy.mockRestore();
  });
});
