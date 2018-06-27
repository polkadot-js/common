// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

/**
 * @name isNull
 * @signature isNull (value: any): boolean
 * @summary Tests for a `null` values.
 * @description
 * Checks to see if the input value is `null`.
 * @example
 *   import { isNull } from '@polkadot/util';
 *
 *   console.log('isNull', isNull(null)); // => true
 */
export default function isNull (value: any): value is null {
  return value === null;
}
