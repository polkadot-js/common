// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import isFunction from './function';
import isObject from './object';

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
export default function isObservable (value: unknown): value is Observable {
  return isObject(value) && isFunction((value as Observable).next);
}
