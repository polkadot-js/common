// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import isInstanceOf from './instanceOf';

/**
  @name isU8a
  @signature isU8a (value: mixed): boolean
  @summary Tests for a `Uint8Array` object instance.
  @description
    Checks to see if the input object is an instance of `Uint8Array`.
  @example
    import { isUint8Array } from '@polkadot/util';

    console.log('isU8a', isU8a([])); // => false
*/
export default function isU8a (value: mixed): boolean {
  return isInstanceOf(value, Uint8Array);
}
