// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import isNull from '../is/null';
import isUndefined from '../is/undefined';

/**
 * @name stringUpperFirst
 * @signature stringUpperFirst (_value: string): string
 * @summary Lowercase the first letter of a string
 * @description
 * Lowercase the first letter of a string
 * @example
 * <BR>
 *
 * ```javascript
 * import { stringUpperFirst } from '@polkadot/util';
 *
 * stringUpperFirst('abc'); // => 'Abc'
 * ```
 */
export default function stringUpperFirst (_value: string): string {
  if (isNull(_value) || isUndefined(_value)) {
    return _value;
  }

  return _value.charAt(0).toUpperCase() + _value.slice(1);
}
