// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isUndefined } from '../is/undefined';

export function objectProperty (that: object, key: string, getter: (k: string) => unknown): void {
  // We use both the hasOwnProperty as well as isUndefined checks here, since it may be set
  // in inherited classes and _Own_ properties refers to the class only, not only parents
  if (!Object.prototype.hasOwnProperty.call(that, key) && isUndefined((that as Record<string, unknown>)[key])) {
    const get = () => getter(key);

    Object.defineProperty(that, key, { enumerable: true, get });
  }
}

export function objectProperties (that: object, keys: string[], getter: (k: string, i: number) => unknown): void {
  for (let i = 0; i < keys.length; i++) {
    objectProperty(that, keys[i], (k) => getter(k, i));
  }
}
