// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AnyString } from '../types';

// Inspired from https://stackoverflow.com/a/2970667
//
// this is not as optimal as the original answer (we split into multiple),
// however it does pass the tests (which the original doesn't) and it is still
// a major improvement over the original camelcase npm package (at running)
//
// original: 20.88 μs/op
//     this:  1.20 μs/op
//
// Caveat of this: only Ascii, but acceptable for the intended usecase
function converter (format: (w: string, i: number) => string): (value: AnyString) => string {
  const formatRuns = (w: string) => w.slice(0, w.length - 1).toLowerCase() + w.slice(-1).toUpperCase();

  return (value: AnyString): string => {
    const parts = value
      .toString()
      // replace all seperators (including consequtive) with spaces
      .replace(/[-_., ]+/g, ' ')
      // we don't want leading or trailing spaces
      .trim()
      // split into words
      .split(' ');
    let result = '';

    for (let i = 0; i < parts.length; i++) {
      const w = parts[i];

      // apply the formatting
      result += format(
        w.toUpperCase() === w
          // all full uppercase + letters are changed to lowercase
          ? w.toLowerCase()
          // all consecutive capitals + letters are changed to lowercase
          // e.g. UUID64 -> uuid64, while preserving splits, eg. NFTOrder -> nftOrder
          : w.replace(/^[A-Z0-9]{2,}[^a-z]/, formatRuns),
        i
      );
    }

    return result;
  };
}

/**
 * @name stringCamelCase
 * @summary Convert a dash/dot/underscore/space separated Ascii string/String to camelCase
 */
export const stringCamelCase = converter((w, i) =>
  // lowercase for first letter/first word, else uppercase first, rest unchanged
  (i ? w[0].toUpperCase() : w[0].toLowerCase()) + w.slice(1)
);

/**
 * @name stringPascalCase
 * @summary Convert a dash/dot/underscore/space separated Ascii string/String to PascalCase
 */
export const stringPascalCase = converter((w) =>
  // uppercase the first character, leave the rest unchanged
  w[0].toUpperCase() + w.slice(1)
);
