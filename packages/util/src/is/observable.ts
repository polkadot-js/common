// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { isFunction } from './function';
import { isObject } from './object';

interface Observable {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: (...params: any[]) => any;
}

/**
 * @name isBObservable
 * @summary Tests for a `Observable` object instance.
 * @description
 * Checks to see if the input object is an instance of `BN` (bn.js).
 * @example
 * <BR>
 *
 * ```javascript
 * import { isObservable } from '@polkadot/util';
 *
 * console.log('isObservable', isObservable(...));
 * ```
 */
export function isObservable (value: unknown): value is Observable {
  return isObject(value) && isFunction((value as Observable).next);
}
