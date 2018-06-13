// Copyright 2017-2018 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const numberToHex = require('@polkadot/util/number/toHex');
const hexToU8a = require('@polkadot/util/hex/toU8a');

module.exports = function encodeLength (length: number, offset: number): Uint8Array {
  if (length < 56) {
    return new Uint8Array([length + offset]);
  }

  const hexLength = numberToHex(length).slice(2);

  return hexToU8a(
    numberToHex(offset + 55 + hexLength.length / 2) + hexLength
  );
};
