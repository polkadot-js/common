// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import hasPrefix from './hasPrefix';

/**
 * @name hexAddPrefix
 * @summary Adds the `0x` prefix to string values.
 * @description
 * Returns a `0x` prefixed string from the input value. If the input is already prefixed, it is returned unchanged.
 * @example
 * <BR>
 *
 * ```javascript
 * import { hexAddPrefix } from '@polkadot/util';
 *
 * console.log('With prefix', hexAddPrefix('0a0b12')); // => 0x0a0b12
 * ```
 */
export default function hexAddPrefix (value?: string | null): string {
  if (value && hasPrefix(value)) {
    return value;
  }

  const prefix = value && value.length % 2 === 1
    ? '0'
    : '';

  return `0x${prefix}${value || ''}`;
}
