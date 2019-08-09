// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import isUndefined from './is/undefined';

interface PjsChecks {
  __polkadotjs: Record<string, boolean>;
}

type PjsGlobal = NodeJS.Global & PjsChecks;
type PjsWindow = Window & PjsChecks;

/**
 * @name assertSingletonPackage
 * @summary Checks that a specific package is only imported once
 */
export default function assertSingletonPackage (name: string): void {
  const _global = typeof window !== 'undefined'
    ? window as PjsWindow
    : global as PjsGlobal;

  if (!_global.__polkadotjs) {
    _global.__polkadotjs = {};
  }

  if (!isUndefined(_global.__polkadotjs[name])) {
    console.warn(`Multiple versions of ${name} detected, ensure that there is only one version in your dependency tree`);
  }

  _global.__polkadotjs[name] = true;
}
