// Copyright 2017-2018 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Trie$Pairs } from '../types';

import encodePairs from './pairs';
import encodeShared from './shared';
import encodeSingle from './single';
import sharedPrefixLength from '../util/sharedPrefixLength';

export default function encode (pairs: Trie$Pairs, preLength: number): Array<any> {
  if (pairs.length === 0) {
    return [];
  }

  if (pairs.length === 1) {
    return encodeSingle(pairs[0], preLength);
  }

  const sharedLength = sharedPrefixLength(pairs);

  if (sharedLength > preLength) {
    return encodeShared(pairs, preLength, sharedLength);
  }

  const result = encodePairs(pairs, preLength);

  result.push(
    preLength !== pairs[0].k.length
      ? ''
      : pairs[0].v
  );

  return result;
}
