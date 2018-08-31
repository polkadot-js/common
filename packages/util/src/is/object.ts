// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

type ObjectIndexed = {
  [index: string]: any
};

/**
 * @name isObject
 * @signature isObject (value: any): boolean
 * @summary Tests for an `object`.
 * @description
 * Checks to see if the input value is a JavaScript object.
 * @example
 *   import { isObject } from '@polkadot/util';
 *
 *   isObject({}); // => true
 *   isObject('something'); // => false
 */
export default function isObject (value: any): value is ObjectIndexed {
  return typeof value === 'object';
}
