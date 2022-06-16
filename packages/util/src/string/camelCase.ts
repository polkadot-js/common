// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AnyString } from '../types';

export const CC_TO_UP = new Array<string>(256);
export const CC_TO_LO = new Array<string>(256);

for (let i = 0; i < CC_TO_UP.length; i++) {
  CC_TO_LO[i] = String.fromCharCode(i).toLowerCase();
  CC_TO_UP[i] = String.fromCharCode(i).toUpperCase();
}

/** @internal */
function formatRuns (w: string): string {
  return w.slice(0, w.length - 1).toLowerCase() + CC_TO_UP[w.charCodeAt(w.length - 1)];
}

// Inspired from https://stackoverflow.com/a/2970667
//
// this is not as optimal as the original answer (we split into multiple),
// however it does pass the tests (which the original doesn't) and it is still
// a major improvement over the original camelcase npm package (at running)
//
// original: 20.88 μs/op
//     this:  1.00 μs/op
//
// Caveat of this: only Ascii, but acceptable for the intended usecase
function converter (format: (w: string, i: number) => string): (value: AnyString) => string {
  return (value: AnyString): string => {
    const parts = value
      // replace all seperators (including consequtive) with spaces
      .replace(/[-_., ]+/g, ' ')
      // we don't want leading or trailing spaces
      .trim()
      // split into words
      .split(' ');
    const count = parts.length;
    let result = '';

    for (let i = 0; i < count; i++) {
      const w = parts[i];

      // apply the formatting
      result += format(
        /^[A-Z0-9]+$/.test(w)
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
  (i ? CC_TO_UP[w.charCodeAt(0)] : CC_TO_LO[w.charCodeAt(0)]) + w.slice(1)
);

/**
 * @name stringPascalCase
 * @summary Convert a dash/dot/underscore/space separated Ascii string/String to PascalCase
 */
export const stringPascalCase = converter((w) =>
  // uppercase the first character, leave the rest unchanged
  CC_TO_UP[w.charCodeAt(0)] + w.slice(1)
);
