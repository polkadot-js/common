// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

module.exports = function encodeHexPrefix (nibbles: Uint8Array | Array<number>, isLeaf: boolean): Uint8Array {
  const bits = ((nibbles.length & 1) + (2 * (isLeaf ? 1 : 0))) << 4;
  const result = [];
  let offset = nibbles.length % 2;

  result.push(bits + (offset ? nibbles[0] : 0));

  while (offset < nibbles.length) {
    result.push((nibbles[offset] << 4) + nibbles[offset + 1]);
    offset += 2;
  }

  return new Uint8Array(result);
};
