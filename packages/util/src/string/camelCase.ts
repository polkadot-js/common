// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AnyString } from '../types';

const RE_WHITE = /[-_ ]+/g;
const RE_WORDS = /(?:^\w|[A-Z]|\b\w)/g;
const RE_JOIN = /\s/g;

// Adapted from https://stackoverflow.com/a/2970667
//
// this is not as optimal as the original (we split into multiple), however
// it does pass the tests (which the original doesn't) and it is still 10+x
// improvement over the original camelcase npm package (at running)
//
// original: 20.88 μs/op
//     this:  1.70 μs/op
//
// Caveat of this: only Ascii, but acceptable for the intended usecase
function converter (replacer: (w: string, i: number) => string): (value: AnyString) => string {
  return (value: AnyString): string =>
    value
      .toString()
      .replace(RE_WHITE, ' ')
      .replace(RE_WORDS, replacer)
      .replace(RE_JOIN, '');
}

/**
 * @name stringCamelCase
 * @summary Convert a dash/dot/underscore/space separated Ascii string/String to camelCase
 */
export const stringCamelCase = converter((w: string, i: number) =>
  i === 0
    ? w.toLowerCase()
    : w.toUpperCase()
);

/**
 * @name stringPascalCase
 * @summary Convert a dash/dot/underscore/space separated Ascii string/String to PascalCase
 */
export const stringPascalCase = converter((w: string) =>
  w.toUpperCase()
);
