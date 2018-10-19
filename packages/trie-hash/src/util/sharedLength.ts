// Copyright 2017-2018 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

/**
 * @name getSharedLength
 * @signature getSharedLength (a: Uint8Array, b: Uint8Array): number
 * @summary Returns the highest shared index of two u8a's where the values in lesser indexes are the same.
 * Given two u8a's, it first determines the u8a with the shortest length,
 * then iterates through each u8a up to that length. If the value in both u8a's is
 * the same for a certain index, it returns that index, otherwise it returns the shortest length.
 */
export default function getSharedLength (a: Uint8Array, b: Uint8Array): number {
  const count = Math.min(a.length, b.length);

  for (let index = 0; index < count; index++) {
    if (a[index] !== b[index]) {
      return index;
    }
  }

  return count;
}
