// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Trie$Pairs } from '../types';

const keccakAsU8a = require('@polkadot/util-crypto/keccak/asU8a');
const rlp = require('rlp');

const encodeHexPrefix = require('./encodeHexPrefix');
const sharedPrefixLength = require('./sharedPrefixLength');

// flowlint-next-line unclear-type:off
function encodeAux (pairs: Trie$Pairs, preLength: number): any {
  const encoded = encode(pairs, preLength);
  // flowlint-next-line unclear-type:off
  const rlped = rlp.encode((encoded: any));

  if (rlped.length <= 31) {
    return encoded;
  }

  return keccakAsU8a(rlped);
}

// flowlint-next-line unclear-type:off
function encode (pairs: Trie$Pairs, preLength: number): Array<any> {
  if (pairs.length === 0) {
    return [];
  }

  const firstKey = pairs[0].k;

  if (pairs.length === 1) {
    return [
      encodeHexPrefix(
        firstKey.slice(preLength),
        true
      ),
      pairs[0].v
    ];
  }

  const sharedLength = sharedPrefixLength(pairs);

  if (sharedLength > preLength) {
    return [
      encodeHexPrefix(
        firstKey.slice(preLength, sharedLength),
        false
      ),
      encodeAux(pairs, sharedLength)
    ];
  }

  const result = [];
  let begin = preLength === firstKey.length
    ? 1
    : 0;

  for (let index = 0; index < 16; index++) {
    let length = 0;

    for (let j = begin; j < pairs.length; j++) {
      if (pairs[j].k[preLength] === index) {
        length++;
      } else {
        j = pairs.length;
      }
    }

    result.push(
      length === 0
        ? ''
        : encodeAux(
          pairs.slice(begin, begin + length),
          preLength + 1
        )
    );

    begin += length;
  }

  result.push(
    preLength !== firstKey.length
      ? ''
      : pairs[0].v
  );

  return result;
}

module.exports = encode;
