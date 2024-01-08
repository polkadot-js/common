// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { detectPackage, POLKADOTJS_DISABLE_ESM_CJS_WARNING_FLAG } from './detectPackage.js';

describe('detectPackage', (): void => {
  const PKG = '@polkadot/util';
  const VER1 = '9.8.0-beta.45';
  const VER2 = '9.7.1';
  const VER3 = '9.6.1';
  const PATH = '/Users/jaco/Projects/polkadot-js/api/node_modules/@polkadot/util';

  const MISMATCH = `@polkadot/util has multiple versions, ensure that there is only one installed.
Either remove and explicitly install matching versions or dedupe using your package manager.
The following conflicting packages were found:
\tesm ${VER1}\t<unknown>
\tesm ${VER2}        \tnode_modules/@polkadot/api/node_modules/@polkadot/util`;

  it('should not log the first time', (): void => {
    const spy = jest.spyOn(console, 'warn');

    detectPackage({ name: PKG, path: 'auto', type: 'esm', version: VER1 }, PATH);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should log the second time', (): void => {
    const spy = jest.spyOn(console, 'warn');

    detectPackage({ name: PKG, path: '/Users/jaco/Projects/polkadot-js/api/node_modules/@polkadot/api/node_modules/@polkadot/util', type: 'esm', version: VER2 });
    expect(spy).toHaveBeenCalledWith(MISMATCH);
    spy.mockRestore();
  });

  it('should allow for function use', (): void => {
    const spy = jest.spyOn(console, 'warn');

    detectPackage({ name: PKG, path: 'node_modules/@polkadot/util', type: 'cjs', version: VER3 }, () => PATH);
    expect(spy).toHaveBeenCalledWith(`${MISMATCH}
\tcjs ${VER3}        \tnode_modules/@polkadot/util`);
    spy.mockRestore();
  });
});

describe('detectPackageDeps', (): void => {
  const DEP0 = { name: '@polkadot/keyring', path: 'auto', type: 'esm', version: '1.1.1' };
  const DEP1 = { name: '@polkadot/util', path: 'auto', type: 'esm', version: '1.1.2' };
  const DEP2 = { name: '@polkadot/util-crypto', path: 'auto', type: 'esm', version: '1.1.3' };
  const DEP3 = { name: '@polkadot/networks', path: 'auto', type: 'esm', version: '1.1.1' };

  it('should not log when no mismatches are found', (): void => {
    const spy = jest.spyOn(console, 'warn');

    detectPackage({ name: '@polkadot/one', path: 'auto', type: 'esm', version: '1.1.1' }, false, [DEP0, DEP3]);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('should log when mismatches are found', (): void => {
    const spy = jest.spyOn(console, 'warn');

    detectPackage({ name: '@polkadot/two', path: 'auto', type: 'esm', version: '1.1.1' }, false, [DEP0, DEP1, DEP2, DEP3]);
    expect(spy).toHaveBeenCalledWith(`@polkadot/two requires direct dependencies exactly matching version 1.1.1.
Either remove and explicitly install matching versions or dedupe using your package manager.
The following conflicting packages were found:
\t1.1.2\t@polkadot/util
\t1.1.3\t@polkadot/util-crypto`);
    spy.mockRestore();
  });
});

describe('detectPackageEsmCjsNoWarnings', (): void => {
  const PKG = '@polkadot/wasm-crypto';
  const VER1 = '9.8.0-beta.45';
  const PATH = '/Users/jaco/Projects/polkadot-js/api/node_modules/@polkadot/api/node_modules/@polkadot/wasm-crypto';

  it('should not log when there are concurrent esm and cjs versions of the same package with the same version number and warnings are disabled', (): void => {
    const spy = jest.spyOn(console, 'warn');
    const pkgEsm = { name: PKG, path: PATH, type: 'esm', version: VER1 };
    const pkgCjs = { name: PKG, path: `${PATH}/cjs`, type: 'cjs', version: VER1 };

    process.env[POLKADOTJS_DISABLE_ESM_CJS_WARNING_FLAG] = '1';
    detectPackage(pkgEsm, false, []);
    detectPackage(pkgCjs, false, []);

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('detectPackageEsmCjs', (): void => {
  const PKG = '@polkadot/wasm-crypto-wasm';
  const VER1 = '9.8.0-beta.45';
  const PATH = '/Users/jaco/Projects/polkadot-js/api/node_modules/@polkadot/api/node_modules/@polkadot/wasm-crypto-wasm';

  it('should log when there are concurrent esm and cjs versions of the same package with the same version number and warnings are not disabled', (): void => {
    const spy = jest.spyOn(console, 'warn');
    const pkgEsm = { name: PKG, path: PATH, type: 'esm', version: VER1 };
    const pkgCjs = { name: PKG, path: `${PATH}/cjs`, type: 'cjs', version: VER1 };

    process.env[POLKADOTJS_DISABLE_ESM_CJS_WARNING_FLAG] = undefined;
    detectPackage(pkgEsm, false, []);
    detectPackage(pkgCjs, false, []);

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
