// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { AnyString } from '../types';

// Adapted from https://stackoverflow.com/a/2970667
//
// this is not as optimal as the original (we split into multiple), however
// it does pass the tests (which the original doesn't) and it is still 10x
// improvement over the original camelcase npm package (at running)
//
// original: 20.88 μs/op
//     this:  2.06 μs/op
function converter (replacer: (w: string, i: number) => string): (value: AnyString) => string {
  return (value: AnyString): string =>
    value
      .toString()
      .replace(/[-_ ]+/g, ' ')
      .replace(/(?:^\w|[A-Z]|\b\w)/g, replacer)
      .replace(/\s/g, '');
}

/**
 * @name stringCamelCase
 * @summary Convert a dash/dot/underscore/space separated string/String to camelCase
 */
export const stringCamelCase = converter((w: string, i: number) =>
  i === 0
    ? w.toLowerCase()
    : w.toUpperCase()
);

/**
 * @name stringPascalCase
 * @summary Convert a dash/dot/underscore/space separated string/String to PascalCase
 */
export const stringPascalCase = converter((w: string) =>
  w.toUpperCase()
);
