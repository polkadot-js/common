// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

/**
  @name isBoolean
  @signature isBoolean (value: any): boolean
  @summary Tests for a boolean value.
  @description
    Checks to see if the input value is a JavaScript boolean.
  @example
    import { isBoolean } from '@polkadot/util';

    isBoolean(false); // => true
*/
export default function isBoolean (value: any): value is boolean {
  return typeof value === 'boolean';
}
