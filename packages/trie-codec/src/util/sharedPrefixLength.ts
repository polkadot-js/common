// Copyright 2017-2020 @polkadot/trie-codec authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export default function sharedPrefixLength (first: Uint8Array, second: Uint8Array): number {
  const length = Math.min(first.length, second.length);

  for (let index = 0; index < length; index++) {
    if (first[index] !== second[index]) {
      return index;
    }
  }

  return length;
}
