// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AnyString } from '../types';

// Adapted from https://stackoverflow.com/a/2970667
//
// this is not as optimal as the original asnwer (we split into multiple),
// however it does pass the tests (which the original doesn't) and it is still
// a 10+x improvement over the original camelcase npm package (at running)
//
// original: 20.88 μs/op
//     this:  1.91 μs/op
//
// Caveat of this: only Ascii, but acceptable for the intended usecase
function converter (fn: (w: string, i: number) => string): (value: AnyString) => string {
  return (value: AnyString): string =>
    value
      .toString()
      // replace all seperators (including consequtive) with spaces
      .replace(/[-_., ]+/g, ' ')
      // we don't want leading or trailing spaces
      .trim()
      // split into words
      .split(' ')
      // all fully-uppercase words are changes to mixed
      .map((w) => w.toUpperCase() === w ? w.toLowerCase() : w)
      // apply the function to the first letter, the rest as-is
      .map((w, i) => fn(w[0], i) + w.slice(1))
      // combine into a single word
      .join('');
}

/**
 * @name stringCamelCase
 * @summary Convert a dash/dot/underscore/space separated Ascii string/String to camelCase
 */
export const stringCamelCase = converter((w, i) => i ? w.toUpperCase() : w.toLowerCase());

/**
 * @name stringPascalCase
 * @summary Convert a dash/dot/underscore/space separated Ascii string/String to PascalCase
 */
export const stringPascalCase = converter((w) => w.toUpperCase());
