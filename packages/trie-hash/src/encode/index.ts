// Copyright 2017-2018 @polkadot/trie-hash authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Trie$Pairs } from '../types';

import encodePairs from './pairs';
import encodeShared from './shared';
import encodeSingle from './single';
import sharedPrefixLength from '../util/sharedPrefixLength';

/**
 * @name encode
 * @signature encode (pairs: Trie$Pairs, preLength: number): Array<any>
 * @summary Encodes Trie Pairs depending on a provided Prefix Length and the amount of pairs
 * @description
 * - `encode` is called and provided arguments including Trie Pairs and Prefix Length.
 * - If the Trie Pairs have no length then return an empty array
 * - If the Trie Pairs have a length of 1 then we call `encodeSingle` to return a single encoded array with two elements.
 * The first element is a u8a calculated from calling `encodeHexPrefix` with arguments including
 * a slice up to the Prefix Length of the pair's key (aka nibbles), and whether it's a leaf.
 * The second element is the pair's value.
 * - If the Trie Pairs have a length > 1 and we calculate that their Shared Prefix Length > Prefix Length
 * then we return early with the results of calling `encodeShared` to return a single encoded array
 * with two elements. The first element is a u8a calculated as previously with `encodeHexPrefix` and
 * whereas second element is calculated from calling `encodeAux`, which recursively calls this function `encode`
 * to obtain an encoded value, and then Recursive Length Prefix (RLP) encodes it. If the length of the RLP encoded u8a
 * is less than 32 then return the RLP encoded value, otherwise return call the Keccak-256 hash function from [js-sha3](https://www.npmjs.com/package/js-sha3) library
 * on the RLP encoded value and return the result.
 * - If the Trie Pairs have a length > 1 and the calculated Share Prefix Length <= Prefix Length
 * then we return the array result of calling `encodePairs` and push the pair's value onto the end of the array
 * if the Prefix Length !== Pair's Key Length.
 *
 * @description Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)
 */
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
