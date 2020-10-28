// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @name stringLowerFirst
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
// eslint-disable-next-line @typescript-eslint/ban-types
export default function stringLowerFirst (value?: string | String | null): string {
  return value
    ? value.charAt(0).toLowerCase() + value.slice(1)
    : '';
}
