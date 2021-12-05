// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AnyString } from '../types';

// Inspired from https://stackoverflow.com/a/2970667
//
// this is not as optimal as the original answer (we split into multiple),
// however it does pass the tests (which the original doesn't) and it is still
// a 10+x improvement over the original camelcase npm package (at running)
//
// original: 20.88 μs/op
//     this:  2.97 μs/op
//
// Caveat of this: only Ascii, but acceptable for the intended usecase
function converter (fn: (w: string, i: number) => string): (value: AnyString) => string {
  const format = (w: string, i: number) => fn(w[0], i) + w.slice(1);

  return (value: AnyString): string =>
    value
      .toString()
      // replace all seperators (including consequtive) with spaces
      .replace(/[-_., ]+/g, ' ')
      // we don't want leading or trailing spaces
      .trim()
      // split into words
      .split(' ')
      // apply the formatting
      .map((w, i) =>
        format(
          w.toUpperCase() === w
            // all full uppercase + letters are changed to lowercase
            ? w.toLowerCase()
            // all consecutive capitals + letters are changed to lowercase
            : w.replace(/[A-Z]+[0-9]+/g, (w) => w.toLowerCase()),
          i
        )
      )
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
