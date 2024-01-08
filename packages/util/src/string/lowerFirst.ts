// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AnyString } from '../types.js';

import { CC_TO_LO, CC_TO_UP } from './camelCase.js';

/** @internal */
function converter (map: readonly string[]): (value?: AnyString | null) => string {
  return (value?: AnyString | null): string =>
    value
      ? map[value.charCodeAt(0)] + value.slice(1)
      : '';
}

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
export const stringLowerFirst = /*#__PURE__*/ converter(CC_TO_LO);

/**
 * @name stringUpperFirst
 * @summary Uppercase the first letter of a string
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
export const stringUpperFirst = /*#__PURE__*/ converter(CC_TO_UP);
