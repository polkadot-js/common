// Copyright 2017-2019 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import isNull from '../is/null';
import isUndefined from '../is/undefined';

/**
 * @name stringLowerFirst
 * @signature stringLowerFirst (_value: string): string
 * @summary Lowercase the first letter of a string
 * @description
 * Lowercase the first letter of a string
 * @example
 * <BR>
 *
 * ```javascript
 * import { stringLowerFirst } from '@polkadot/util';
 *
 * stringLowerFirst('ABC'); // => 'aBC'
 * ```
 */
export default function stringLowerFirst (_value: string): string {
  if (isNull(_value) || isUndefined(_value)) {
    return _value;
  }

  return _value.charAt(0).toLowerCase() + _value.slice(1);
}
