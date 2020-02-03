// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { detectPackage } from '.';

const VER_1 = 'a.b.c-1st';
const VER_2 = 'a.b.c-2nd';

describe('assertSingletonPackage', (): void => {
  it('should not log the first time', (): void => {
    const spy = jest.spyOn(console, 'warn');

    detectPackage(__dirname, { name: '@polkadot/util', version: VER_1 });
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  describe('logging', (): void => {
    const TEST_PATH = '/Users/jaco/Projects/polkadot-js/api/node_modules/@polkadot/util';
    const TEST_RESULT = `${TEST_PATH}: Multiple instances of @polkadot/util detected: ${VER_1}, ${VER_2}. Ensure that there is only one package in your dependency tree`;

    it('should log the second time', (): void => {
      const spy = jest.spyOn(console, 'warn');

      detectPackage('/Users/jaco/Projects/polkadot-js/api/node_modules/@polkadot/keyring', { name: '@polkadot/util', version: VER_2 });
      expect(spy).toHaveBeenCalledWith(TEST_RESULT);
      spy.mockRestore();
    });

    it('filters duplicate versions', (): void => {
      const spy = jest.spyOn(console, 'warn');

      detectPackage('/Users/jaco/Projects/polkadot-js/api/node_modules/@polkadot/keyring', { name: '@polkadot/util', version: VER_2 });
      expect(spy).toHaveBeenCalledWith(TEST_RESULT);
      spy.mockRestore();
    });
  });
});
