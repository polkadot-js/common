// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import isNull from '../is/null';
import isUndefined from '../is/undefined';

/**
 * @name arrayFilter
 * @summary Filters undefined and (optionally) null values from an array
 * @description
 * Returns a new array with all `undefined` values removed. Optionally, when `allowNulls = false`, it removes the `null` values as well
 * @example
 * <BR>
 *
 * ```javascript
 * import { arrayFilter } from '@polkadot/util';
 *
 * arrayFilter([0, void 0, true, null, false, '']); // [0, true, null, false, '']
 * arrayFilter([0, void 0, true, null, false, ''], false); // [0, true, false, '']
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function arrayFilter <T = any> (array: T[], allowNulls = true): T[] {
  return array.filter((value) =>
    !isUndefined(value) && (allowNulls || !isNull(value))
  );
}
