// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexHasPrefix } from './hasPrefix';

const UNPREFIX_HEX_REGEX = /^[a-fA-F0-9]+$/;

/**
 * @name hexStripPrefix
 * @summary Strips any leading `0x` prefix.
 * @description
 * Tests for the existence of a `0x` prefix, and returns the value without the prefix. Un-prefixed values are returned as-is.
 * @example
 * <BR>
 *
 * ```javascript
 * import { hexStripPrefix } from '@polkadot/util';
 *
 * console.log('stripped', hexStripPrefix('0x1234')); // => 1234
 * ```
 */
export function hexStripPrefix (value?: string | null): string {
  if (!value) {
    return '';
  } else if (hexHasPrefix(value)) {
    return value.substr(2);
  } else if (UNPREFIX_HEX_REGEX.test(value)) {
    return value;
  }

  throw new Error(`Invalid hex ${value} passed to hexStripPrefix`);
}
