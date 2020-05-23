// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

interface ObjectIndexed {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [index: string]: any;
}

/**
 * @name isJsonObject
 * @summary Tests for a valid JSON `object`.
 * @description
 * Checks to see if the input value is a valid JSON object.
 * It returns false if the input is JSON parsable, but not an Javascript object.
 * @example
 * <BR>
 *
 * ```javascript
 * import { isJsonObject } from '@polkadot/util';
 *
 * isJsonObject({}); // => true
 * isJsonObject({
 *  "Test": "1234",
 *  "NestedTest": {
 *   "Test": "5678"
 *  }
 * }); // => true
 * isJsonObject(1234); // JSON parsable, but not an object =>  false
 * isJsonObject(null); // JSON parsable, but not an object => false
 * isJsonObject('not an object'); // => false
 * ```
 */
export default function isJsonObject (value: unknown): value is ObjectIndexed {
  const str = typeof value !== 'string'
    ? JSON.stringify(value)
    : value;

  try {
    const obj = JSON.parse(str) as unknown;

    return (typeof obj === 'object' && obj !== null);
  } catch (e) {
    return false;
  }
}
