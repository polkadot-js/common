// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

/**
  @name stringShorten
  @signature stringShorten (value: mixed, prefixLength: number = 8): string
  @summary Returns a string with maximum length
  @description
    Checks the string against the `prefixLength`, if longer than dopuble this, shortens it by placing `..` in the middle of it
  @example
    import { stringShorten } from '@polkadot/util';

    stringShorten('1234567890', 2); // => 12..90
*/
export default function stringShorten (_value: mixed, prefixLength: number = 6): string {
  // $FlowFixMe coerced into string (by any means)
  const value = `${_value}`;

  if (value.length <= 2 + 2 * prefixLength) {
    return value;
  }

  return `${value.substr(0, prefixLength)}..${value.slice(-prefixLength)}`;
}
