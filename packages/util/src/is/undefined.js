// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

/**
  @name isUndefined
  @signature isUndefined (value: mixed): boolean
  @summary Tests for a `undefined` values.
  @description
    Checks to see if the input value is `undefined`.
  @example
    import { isUndefined } from '@polkadot/util';

    console.log('isUndefined', isUndefined(void(0))); // => true
*/
export default function isUndefined (value: mixed): boolean {
  return typeof value === 'undefined';
}
