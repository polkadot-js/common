// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AnyString } from '../types';

/**
 * @name stringShorten
 * @summary Returns a string with maximum length
 * @description
 * Checks the string against the `prefixLength`, if longer than double this, shortens it by placing `..` in the middle of it
 * @example
 * <BR>
 *
 * ```javascript
 * import { stringShorten } from '@polkadot/util';
 *
 * stringShorten('1234567890', 2); // => 12..90
 * ```
 */
export function stringShorten (value: AnyString, prefixLength = 6): string {
  return value.length <= 2 + 2 * prefixLength
    ? value.toString()
    : `${value.substr(0, prefixLength)}…${value.slice(-prefixLength)}`;
}
