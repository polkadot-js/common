// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

/**
  @name isFunction
  @signature isFunction (value: any): boolean
  @summary Tests for a `function`.
  @description
    Checks to see if the input value is a JavaScript function.
  @example
    import { isFunction } from '@polkadot/util';

    console.log('isFunction', isFunction(() => false)); // => true
*/
export default function isFunction (value: any): value is Function {
  return typeof value === 'function';
}
