// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import isHex from '../is/hex';

/**
 * @name hexHasPrefix
 * @summary Tests for the existence of a `0x` prefix.
 * @description
 * Checks for a valid hex input value and if the start matched `0x`
 * @example
 * <BR>
 *
 * ```javascript
 * import { hexHasPrefix } from '@polkadot/util';
 *
 * console.log('has prefix', hexHasPrefix('0x1234')); // => true
 * ```
 */
export default function hexHasPrefix (value?: string | null): boolean {
  return !!(value && isHex(value, -1, true) && value.substr(0, 2) === '0x');
}
