// Copyright 2017-2018 @polkadot/util-triehash authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

module.exports = function getSharedLength (a: Uint8Array, b: Uint8Array): number {
  const count = Math.min(a.length, b.length);

  for (let index = 0; index < count; index++) {
    if (a[index] !== b[index]) {
      return index;
    }
  }

  return count;
};
