// ISC, Copyright 2017 Jaco Greeff
// @flow

/**
  @name stringShorten
  @signature stringShorten (value: any, prefixLength: number = 8): string
  @summary Returns a string with maximum length
  @description
    Checks the string against the `prefixLength`, if longer than dopuble this, shortens it by placing `..` in the middle of it
  @example
    import { stringShorten } from '@polkadot/util';

    stringShorten('1234567890', 2); // => 12..90
*/
module.exports = function stringShorten (_value: any, prefixLength: number = 6): string {
  const value = `${_value}`;

  if (value.length <= 2 + 2 * prefixLength) {
    return value;
  }

  return `${value.substr(0, prefixLength)}..${value.slice(-prefixLength)}`;
};
