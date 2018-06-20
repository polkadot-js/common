// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import isInstanceOf from './instanceOf';

/**
  @name isError
  @signature isError (value: mixed): boolean
  @summary Tests for a `Error` object instance.
  @description
    Checks to see if the input object is an instance of `Error`.
  @example
    import { isError } from '@polkadot/util';

    console.log('isError', isError(new Error('message'))); // => true
*/
export default function isError (value: mixed): boolean {
  return isInstanceOf(value, Error);
}
